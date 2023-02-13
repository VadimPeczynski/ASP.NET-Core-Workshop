namespace HeroesAcademy.Application.Services
{
    internal class FileUploadService:IFileUploadService
    {
        public async Task<string> SaveFileAsync(byte[] bytes, string folderName, string fileName, string fileExtension)
        {
            if (string.IsNullOrEmpty(folderName) || string.IsNullOrEmpty(fileName) || string.IsNullOrEmpty(fileExtension))
            {
                throw new FileNotFoundException();
            }
            fileName = Path.GetFileNameWithoutExtension(fileName);
            var folderPath = $"{Environment.GetFolderPath(Environment.SpecialFolder.CommonPictures)}/{folderName}";
            Directory.CreateDirectory(folderPath);
            var filePath = $"{folderPath}/{fileName}{fileExtension}";
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await fileStream.WriteAsync(bytes);
            }

            return $"{folderName}/{fileName}{fileExtension}";
        }
    }

    public interface IFileUploadService
    {
        Task<string> SaveFileAsync(byte[] bytes, string folderName, string fileName, string fileExtension);
    }
}
