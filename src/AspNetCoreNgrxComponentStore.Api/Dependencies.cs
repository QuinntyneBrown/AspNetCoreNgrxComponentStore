using AspNetCoreNgrxComponentStore.Api.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using Scrutor;
using FluentValidation;
using AspNetCoreNgrxComponentStore.Api.Features;
using System.Reflection;
using System.Linq;

namespace AspNetCoreNgrxComponentStore.Api
{
    public static class Dependencies
    {
        public static void Configure(IServiceCollection services, IConfiguration configuration)
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Asp.Net Core and Ngrx Component Store Demo",
                    Description = "",
                    TermsOfService = new Uri("https://example.com/terms"),
                    Contact = new OpenApiContact
                    {
                        Name = "Quinntyne Brown",
                        Email = "quinntynebrown@gmail.com"
                    },
                    License = new OpenApiLicense
                    {
                        Name = "Use under MIT",
                        Url = new Uri("https://opensource.org/licenses/MIT"),
                    }
                });

                options.CustomSchemaIds(x => x.FullName);
            });

            services.AddCors(options => options.AddPolicy("CorsPolicy",
                builder => builder
                .WithOrigins("http://localhost:4200")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(isOriginAllowed: _ => true)
                .AllowCredentials()));

            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

            foreach (var requestType in GetAllTypesImplementingOpenGenericType(typeof(IRequest<>),Assembly.GetExecutingAssembly()))
            {
                var validatorType = typeof(IValidator<>).MakeGenericType(requestType);

                foreach(var validatorImpl in Assembly.GetExecutingAssembly().GetTypes().Where(v => validatorType.IsAssignableFrom(v)))
                {
                    services.AddTransient(validatorType, validatorImpl);
                }
            }

            services.AddMediatR(typeof(Startup));

            services.AddTransient<IAspNetCoreNgrxComponentStoreDbContext, AspNetCoreNgrxComponentStoreDbContext>();

            services.AddDbContext<AspNetCoreNgrxComponentStoreDbContext>(options =>
            {
                options.UseInMemoryDatabase(nameof(AspNetCoreNgrxComponentStoreDbContext));
            });

            services.AddControllers();
        }

        public static IEnumerable<Type> GetAllTypesImplementingOpenGenericType(Type openGenericType, Assembly assembly)
        {
            return from x in assembly.GetTypes()
                   from z in x.GetInterfaces()
                   let y = x.BaseType
                   where
                   (y != null && y.IsGenericType &&
                   openGenericType.IsAssignableFrom(y.GetGenericTypeDefinition())) ||
                   (z.IsGenericType &&
                   openGenericType.IsAssignableFrom(z.GetGenericTypeDefinition()))
                   select x;
        }
    }
}
