using AspNetCoreNgrxComponentStore.Api.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;

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

            services.AddHttpContextAccessor();


            services.AddMediatR(typeof(Startup));

            services.AddTransient<IAspNetCoreNgrxComponentStoreDbContext, AspNetCoreNgrxComponentStoreDbContext>();

            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler
            {
                InboundClaimTypeMap = new Dictionary<string, string>()
            };

            services.AddDbContext<AspNetCoreNgrxComponentStoreDbContext>(options =>
            {
                options.UseInMemoryDatabase(nameof(AspNetCoreNgrxComponentStoreDbContext));
            });

            services.AddControllers();
        }
    }
}
