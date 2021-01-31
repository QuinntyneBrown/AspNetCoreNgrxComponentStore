using FluentValidation;

namespace AspNetCoreNgrxComponentStore.Api.Features
{
    public class ToDoValidator : AbstractValidator<ToDoDto>
    {
        public ToDoValidator()
        {
            
        }
    }
}
