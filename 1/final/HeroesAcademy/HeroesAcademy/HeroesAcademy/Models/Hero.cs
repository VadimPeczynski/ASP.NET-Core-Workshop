namespace HeroesAcademy.Models
{
    public class Hero
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public string SecretIdentity { get; set; }
        public decimal Salary { get; set; }
        public string Description { get; set; }
        public double Strength { get; set; }
        public string LogoUrl { get; set; }
        public bool IsActive { get; set; }
    }
}
