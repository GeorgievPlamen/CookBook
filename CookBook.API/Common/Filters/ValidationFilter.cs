using FluentValidation;

namespace CookBook.API.Common.Filters;

public class ValidationFilter<TRequest>(IValidator<TRequest> validator) : IEndpointFilter
{
    private readonly IValidator<TRequest> _validator = validator;

    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        var request = context.GetArgument<TRequest>(0);

        var validationResult = await _validator.ValidateAsync(request);

        if (validationResult.IsValid is false)
        {
            var errors = new Dictionary<string, string[]>();

            foreach (var error in validationResult.Errors)
            {
                errors.TryAdd(error.PropertyName, [$"Attempted value: '{error.AttemptedValue}'.", error.ErrorMessage]);
            }

            return Results.ValidationProblem(errors);
        }

        return await next(context);
    }
}
