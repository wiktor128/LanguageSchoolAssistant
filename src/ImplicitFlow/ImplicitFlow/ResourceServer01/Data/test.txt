using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using ResourceServer01.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace ResourceServer01
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();

        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddMvc();


            services.AddDbContext<ApplicationDbContext>(options => {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            }
);
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseOAuthIntrospection(options =>
            {
                options.Authority = new Uri("http://localhost:12345/");
                options.Audiences.Add("resource-server-1");
                options.ClientId = "resource-server-1";
                options.ClientSecret = "846B62D0-DEF9-4215-A99D-86E6B8DAB342";
                options.RequireHttpsMetadata = false;

                // Note: you can override the default name and role claims:
                // options.NameClaimType = "custom_name_claim";
                // options.RoleClaimType = "custom_role_claim";
            });

            // If you prefer using JWT, don't forget to disable the automatic
            // JWT -> WS-Federation claims mapping used by the JWT middleware:
            //
            // JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            // JwtSecurityTokenHandler.DefaultOutboundClaimTypeMap.Clear();
            //
            // app.UseJwtBearerAuthentication(new JwtBearerOptions
            // {
            //     Authority = "http://localhost:12345/",
            //     Audience = "resource-server-1",
            //     RequireHttpsMetadata = false,
            //     TokenValidationParameters = new TokenValidationParameters
            //     {
            //         NameClaimType = OpenIdConnectConstants.Claims.Subject,
            //         RoleClaimType = OpenIdConnectConstants.Claims.Role
            //     }
            // });

            app.UseCors(builder =>
            {
                //builder.WithOrigins("https://localhost:8080");
                //builder.WithMethods("GET");
                //builder.WithHeaders("Authorization");
                builder.AllowAnyMethod();
                builder.AllowAnyHeader();
                builder.AllowAnyOrigin();
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "empty",
                    template: "{controller=Resource}/{action=Public}"
                );

                routes.MapRoute(
                    name: "api",
                    template: "api/{action=Public}",
                    defaults: new { controller = "Resource" }
                );
            });
        }
    }
}
