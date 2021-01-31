using AspNetCoreNgrxComponentStore.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AspNetCoreNgrxComponentStore.Api.Data
{
    public class ToDoConfiguration : IEntityTypeConfiguration<ToDo>
    {
        public void Configure(EntityTypeBuilder<ToDo> builder)
        {
            builder.HasQueryFilter(p => !p.Deleted.HasValue);
        }
    }
}
