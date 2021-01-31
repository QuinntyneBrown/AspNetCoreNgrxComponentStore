using AspNetCoreNgrxComponentStore.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AspNetCoreNgrxComponentStore.Api.Data
{
    public class AspNetCoreNgrxComponentStoreDbContext : DbContext, IAspNetCoreNgrxComponentStoreDbContext
    {
        public AspNetCoreNgrxComponentStoreDbContext (DbContextOptions options)
            :base(options) { }

        public static readonly ILoggerFactory ConsoleLoggerFactory
            = LoggerFactory.Create(builder => { builder.AddConsole(); });

        public DbSet<ToDo> ToDos { get; private set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AspNetCoreNgrxComponentStoreDbContext ).Assembly);
        }

        public IAspNetCoreNgrxComponentStoreDbContext AsNoTracking()
        {
            ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;

            return this;
        }
    }
}
