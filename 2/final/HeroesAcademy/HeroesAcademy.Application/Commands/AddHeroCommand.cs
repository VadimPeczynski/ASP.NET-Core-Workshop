using HeroesAcademy.Application.Repository;
using HeroesAcademy.Domain.Models;
using MediatR;

namespace HeroesAcademy.Application.Commands
{
    public class AddHeroCommand:IRequest<ResponseResult<Hero>>
    {
        public Hero Hero { get; }
        public AddHeroCommand(Hero hero)
        {
            Hero = hero;
        }
    }

    public class AddHeroCommandHandler:IRequestHandler<AddHeroCommand, ResponseResult<Hero>>
    {
        private readonly IHeroRepository _repository;

        public AddHeroCommandHandler(IHeroRepository repository)
        {
            _repository = repository;
        }
        public Task<ResponseResult<Hero>> Handle(AddHeroCommand request, CancellationToken cancellationToken)
        {
            return _repository.Add(request.Hero);
        }
    }
}
