using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HeroesAcademy.Domain.Models
{
    public class Sidekick
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int HeroId { get; set; }
        public Hero Hero { get; set; }
    }
}
