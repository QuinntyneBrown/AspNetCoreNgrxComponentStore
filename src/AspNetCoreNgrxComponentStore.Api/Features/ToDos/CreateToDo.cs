using FluentValidation;
using AspNetCoreNgrxComponentStore.Api.Data;
using AspNetCoreNgrxComponentStore.Api.Models;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace AspNetCoreNgrxComponentStore.Api.Features
{
    public class CreateToDo
    {
        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(request => request.ToDo).NotNull();
                RuleFor(request => request.ToDo).SetValidator(new ToDoValidator());
            }
        }

        public class Request : IRequest<Response> {  
            public ToDoDto ToDo { get; set; }
        }

        public class Response
        {
            public ToDoDto ToDo { get; set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IAspNetCoreNgrxComponentStoreDbContext _context;

            public Handler(IAspNetCoreNgrxComponentStoreDbContext context) => _context = context;

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken) {

                var toDo = new ToDo();

                _context.ToDos.Add(toDo);

                toDo.Name = request.ToDo.Name;
                toDo.HtmlBody = request.ToDo.HtmlBody;
                
                await _context.SaveChangesAsync(cancellationToken);

                return new Response()
                {
                    ToDo = toDo.ToDto()
                };
            }
        }
    }
}
