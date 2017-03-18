using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Security.Cryptography.X509Certificates;

namespace AuthorizationServer
{
    public static class Program
    {
        public static void Main(string[] args)
        {
        	 var cert = new X509Certificate2("AuthSample.pfx", 
    "123123");

            var configuration = new ConfigurationBuilder()
                .AddEnvironmentVariables()
                .AddCommandLine(args)
                .Build();

            var host = new WebHostBuilder()
                .ConfigureLogging(options => options.AddConsole())
                .ConfigureLogging(options => options.AddDebug())
                .UseConfiguration(configuration)
                .UseIISIntegration()
                .UseKestrel(cfg => cfg.UseHttps(cert))
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}
