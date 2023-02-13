namespace HeroesAcademy.Configuration
{
    public class FileServerConfiguration
    {
        public const string SectionName = "FileServerSettings";
        public string RequestPath { get; set; } = "/container";
    }
}
