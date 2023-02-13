using HeroesAcademy.Application.Services;
using HeroesAcademy.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace HeroesAcademy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageUploadController : ControllerBase
    {
        private readonly IFileUploadService _service;
        private readonly FileServerConfiguration _configuration;
        private const string PngFileExtension = ".png";

        public ImageUploadController(IFileUploadService service, IOptions<FileServerConfiguration> options)
        {
            _service = service;
            _configuration = options.Value;
        }
        [HttpPost]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file)
        {
            using (var fileStream = new MemoryStream())
            {
                await file.CopyToAsync(fileStream);
                var filePath = await _service.SaveFileAsync(fileStream.ToArray(), "Logos", file.FileName, PngFileExtension);
                return Ok($"{_configuration.RequestPath}/{filePath}");
            }
        }
    }
}
