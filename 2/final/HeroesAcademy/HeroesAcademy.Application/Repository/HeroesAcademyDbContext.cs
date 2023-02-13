using Duende.IdentityServer.EntityFramework.Options;
using HeroesAcademy.Domain.Models;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace HeroesAcademy.Application.Repository
{
    internal class HeroesAcademyDbContext:ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<Hero> Heroes { get; set; }

        public HeroesAcademyDbContext(DbContextOptions<HeroesAcademyDbContext> options, IOptions<OperationalStoreOptions> operationalStoreOptions) :base(options, operationalStoreOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Hero>().Property(x => x.Salary).HasPrecision(9, 2);
            builder.Entity<Hero>().HasData(new Hero()
            {
                Id = 1,
                Name = "Iron Man",
                Team = "Avengers",
                SecretIdentity = "Tony Stark",
                Salary = 0.99m,
                Description = "Man with iron suit",
                Strength = 4.2,
                LogoUrl = "assets/logos/iron-man.png"
            });
            builder.Entity<Hero>().HasData(new Hero()
            {
                Id = 2,
                Name = "Thor",
                Team = "Avengers",
                SecretIdentity = "Thor Odinson",
                Salary = 10.99m,
                Description = "Norse god of thunder",
                Strength = 4.5,
                LogoUrl = "assets/logos/thor.png"
            });
            builder.Entity<Hero>().HasData(new Hero()
            {
                Id = 3,
                Name = "Superman",
                Team = "Justice League",
                SecretIdentity = "Clark Kent",
                Salary = 3500,
                Description = "Man of steel",
                Strength = 5.0,
                LogoUrl = "assets/logos/superman.png"
            });
        }
    }
}
