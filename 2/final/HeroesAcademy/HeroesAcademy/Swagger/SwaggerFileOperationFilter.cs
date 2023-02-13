using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace HeroesAcademy.Swagger
{
    public class SwaggerFileOperationFilter:IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            const string fileUploadMime = "multipart/form-data";
            if (operation.RequestBody?.Content.Any(x => x.Key.Equals(fileUploadMime, StringComparison.InvariantCultureIgnoreCase)) != true)
                return;

            var fileParams = context.MethodInfo.GetParameters().Where(p => p.ParameterType == typeof(IFormFile));
            operation.RequestBody.Content[fileUploadMime].Schema.Properties =
                fileParams.ToDictionary(k => k.Name, _ => new OpenApiSchema()
                {
                    Type = "string",
                    Format = "binary"
                });
        }
    }
}
