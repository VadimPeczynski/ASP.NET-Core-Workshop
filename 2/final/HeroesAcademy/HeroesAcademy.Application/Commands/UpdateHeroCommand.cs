using HeroesAcademy.Application.Repository;
using HeroesAcademy.Domain.Models;
using MediatR;

namespace HeroesAcademy.Application.Commands;

public class UpdateHeroCommand : IRequest<ResponseResult<Hero>>
{
    public int HeroId { get; }
    public Hero Hero { get; }
    public UpdateHeroCommand(int heroId, Hero hero)
    {
        HeroId = heroId;
        Hero = hero;
    }
}

public class UpdateHeroCommandHandler : IRequestHandler<UpdateHeroCommand, ResponseResult<Hero>>
{
    private readonly IHeroRepository _repository;

    public UpdateHeroCommandHandler(IHeroRepository repository)
    {
        _repository = repository;
    }
    public Task<ResponseResult<Hero>> Handle(UpdateHeroCommand request, CancellationToken cancellationToken)
    {
        return _repository.Update(request.HeroId, request.Hero);
    }
}