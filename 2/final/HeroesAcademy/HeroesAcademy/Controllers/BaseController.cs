using System.Net;
using HeroesAcademy.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace HeroesAcademy.Controllers;

public class BaseController:ControllerBase
{
    [NonAction]
    public OkObjectResult OkOrError(object? value)
    {
        var result = new OkObjectResult(value);
        if (value is IResponseResult response)
        {
            result.StatusCode = GetStatusCode(response.ErrorType);
            return result;
        }

        return base.Ok(value);
    }

    private int? GetStatusCode(ErrorType responseErrorType)
    {
        var result = 0;
        switch (responseErrorType)
        {
            case ErrorType.NotFound:
                result = (int)HttpStatusCode.NotFound;
                break;
            case ErrorType.ValidationError:
                result = (int)HttpStatusCode.BadRequest;
                break;
            case ErrorType.None:
                break;
        }

        return result;
    }
}