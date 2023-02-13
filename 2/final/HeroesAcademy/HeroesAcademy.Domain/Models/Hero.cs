namespace HeroesAcademy.Domain.Models
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
        public Location? Location { get; set; } = null!;
        public ICollection<Sidekick> Sidekicks { get; set; } = Array.Empty<Sidekick>();
        public ICollection<Equipment> Equipments { get; set; } = Array.Empty<Equipment>();
    }
}
