using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using System.Security.Cryptography.X509Certificates;

namespace LanguageSchoolAssistant
{
    public class Program
    {
        //X509Certificate2 cert = new X509Certificate2(
        //        Directory.GetCurrentDirectory() + "\\wwwroot\\certificates\\AuthSample.pfx",
        //        "123123");
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}
