using HeroesAcademy.Application.Repository;
using HeroesAcademy.Domain.Models;
using MediatR;

namespace HeroesAcademy.Application.Commands;

public class DeleteHeroCommand : IRequest<ResponseResult<int>>
{
    public int HeroId { get; }
    public DeleteHeroCommand(int heroId)
    {
        HeroId = heroId;
    }
}

public class DeleteHeroCommandHandler : IRequestHandler<DeleteHeroCommand, ResponseResult<int>>
{
    private readonly IHeroRepository _repository;

    public DeleteHeroCommandHandler(IHeroRepository repository)
    {
        _repository = repository;
    }
    public async Task<ResponseResult<int>> Handle(DeleteHeroCommand request, CancellationToken cancellationToken)
    {
        var isSuccess = await _repository.Delete(request.HeroId);
        if (isSuccess)
        {
            return ResponseResult.Ok(request.HeroId);
        }
        return ResponseResult.NotFound<int>($"Hero with ID: {request.HeroId} was not found");
    }
}