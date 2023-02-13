using HeroesAcademy.Domain.Models;

namespace HeroesAcademy.Application.Repository
{
    public interface IHeroRepository
    {
        //Hero Add(Hero hero);
        Task<ResponseResult<List<Hero>>> Get();
        ValueTask<ResponseResult<Hero?>> GetbyId(int id);
        Task<ResponseResult<Hero>> Add(Hero hero);
        Task<bool> Delete(int id);
        Task<ResponseResult<Hero>> Update(int heroId, Hero hero);
    }
}
