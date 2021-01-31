using AspNetCoreNgrxComponentStore.Api.Data;
using AspNetCoreNgrxComponentStore.Api.Models;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace AspNetCoreNgrxComponentStore.Api.Features
{
    public class GetToDoById
    {
        public class Request : IRequest<Response> {  
            public Guid ToDoId { get; set; }        
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

                var toDo = await _context.AsNoTracking().ToDos.FindAsync(request.ToDoId);

                return new Response() { 
                    ToDo = toDo.ToDto()
                };
            }
        }
    }
}
