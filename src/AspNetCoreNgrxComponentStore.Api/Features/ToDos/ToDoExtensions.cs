using AspNetCoreNgrxComponentStore.Api.Models;

namespace AspNetCoreNgrxComponentStore.Api.Features
{
    public static class ToDoExtensions
    {
        public static ToDoDto ToDto(this ToDo toDo)
        {
            return new ToDoDto
            {
                ToDoId = toDo.ToDoId,
                Name = toDo.Name,
                HtmlBody = toDo.HtmlBody,
                Completed = toDo.Completed,
                Modified = toDo.Modified
            };
        }
    }
}
