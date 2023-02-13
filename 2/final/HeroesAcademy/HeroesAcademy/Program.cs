using HeroesAcademy.Application;
using HeroesAcademy.Configuration;
using HeroesAcademy.Swagger;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);
var myAllowPolicy = "_myAllowSpecificOrigins";

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowPolicy, policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});
builder.Services.AddControllersWithViews(options=> options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true).AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
});
builder.Services.AddSwaggerGen(c =>
{
    c.OperationFilter<SwaggerFileOperationFilter>();
});
builder.Services.Configure<FileServerConfiguration>(builder.Configuration.GetSection(FileServerConfiguration.SectionName));

var connectionString = builder.Configuration.GetConnectionString("HeroesAcademy");
builder.Services.AddApplication(connectionString);
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//app.UseHttpsRedirection();
app.UseFileServer(true);
app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("v1/swagger.json", "Heroes Academy"));
var options = app.Services.GetRequiredService<IOptions<FileServerConfiguration>>();
app.UseStaticFiles(
    new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider($"{Environment.GetFolderPath(Environment.SpecialFolder.CommonPictures)}"),
            RequestPath= options.Value.RequestPath,
            ContentTypeProvider = new FileExtensionContentTypeProvider()
    });
app.UseRouting();

app.UseAuthentication();
app.UseIdentityServer();
app.UseAuthorization();

app.UseCors(myAllowPolicy);


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapRazorPages();

app.MapFallbackToFile("index.html");

app.Run();
