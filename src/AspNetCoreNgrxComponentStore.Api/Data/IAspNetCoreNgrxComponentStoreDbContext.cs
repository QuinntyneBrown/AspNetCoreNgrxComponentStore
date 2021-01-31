using AspNetCoreNgrxComponentStore.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace AspNetCoreNgrxComponentStore.Api.Data
{
    public interface IAspNetCoreNgrxComponentStoreDbContext
    {
        DbSet<ToDo> ToDos { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);

        IAspNetCoreNgrxComponentStoreDbContext AsNoTracking();
    }
}
