using HeroesAcademy.Application.Repository;
using HeroesAcademy.Domain.Models;
using MediatR;

namespace HeroesAcademy.Application.Query
{
    public class GetHeroByIdQuery:IRequest<ResponseResult<Hero?>>
    {
        public int Id { get; }

        public GetHeroByIdQuery(int id)
        {
            Id = id;
        }
    }

    public class GetHeroByIdQueryHandler:IRequestHandler<GetHeroByIdQuery, ResponseResult<Hero?>>
    {
        private readonly IHeroRepository _repository;

        public GetHeroByIdQueryHandler(IHeroRepository repository)
        {
            _repository = repository;
        }
        public async Task<ResponseResult<Hero?>> Handle(GetHeroByIdQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetbyId(request.Id);
        }
    }
}
