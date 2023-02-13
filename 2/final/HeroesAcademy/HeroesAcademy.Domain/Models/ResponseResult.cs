using static System.String;

namespace HeroesAcademy.Domain.Models;

public static class ResponseResult
{
    public static ResponseResult<T> Ok<T>(T data) => new(data, Empty, ErrorType.None);

    public static ResponseResult<T> NotFound<T>(string message) =>
        new ResponseResult<T>(default!, message, ErrorType.NotFound);
}

public class ResponseResult<T>:IResponseResult<T>
{
    public T Data { get; set; }
    public string Message { get; set; }
    public ErrorType ErrorType { get; set; }
    public int? HttpError { get; set; }

    public ResponseResult(T data, string message, ErrorType errorType, int? httpError = 0)
    {
        Data = data;
        Message = message;
        ErrorType = errorType;
        HttpError = httpError;
    }
}

public interface IResponseResult<T>:IResponseResult
{
    T Data { get; set; }
}

public interface IResponseResult
{
    public string Message { get; set; }
    public ErrorType ErrorType { get; set; }
    public int? HttpError { get; set; }
}

public enum ErrorType
{
    None = 0,
    NotFound,
    ValidationError,
    HttpError,
    Unknown,
    Failed
}