namespace HeroesAcademy.Domain.Models
{
    public class Location
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int HeroId { get; set; }
        public Hero Hero { get; set; }
    }
}
