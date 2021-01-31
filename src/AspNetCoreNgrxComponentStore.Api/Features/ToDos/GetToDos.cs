using AspNetCoreNgrxComponentStore.Api.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AspNetCoreNgrxComponentStore.Api.Features
{
    public class GetToDos
    {
        public class Request : IRequest<Response> {  }

        public class Response
        {
            public List<ToDoDto> ToDos { get; set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IAspNetCoreNgrxComponentStoreDbContext _context;

            public Handler(IAspNetCoreNgrxComponentStoreDbContext context) => _context = context;

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken) {
			    return new Response() { 
                    ToDos = await _context.AsNoTracking().ToDos.Select(x => x.ToDto()).ToListAsync()
                };
            }
        }
    }
}
