using System.Security.Claims;
using AspNet.Security.OAuth.Introspection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace ResourceServer01.Controllers
{
    public class ResourceController : Controller
    {
        private IHostingEnvironment _environment;

        public ResourceController(IHostingEnvironment environment)
        {
            _environment = environment;
        }

        [Authorize (
            ActiveAuthenticationSchemes = OAuthIntrospectionDefaults.AuthenticationScheme,
            Roles = "LanguageInstructor"
        )]
        [HttpGet]
        public IActionResult Private()
        {
            var identity = User.Identity as ClaimsIdentity;
            if (identity == null)
            {
                return BadRequest();
            }

            return Json($"You have authorized access to resources belonging to {identity.Name} on ResourceServer01.");
        }

        [HttpGet]
        public IActionResult Public()
        {
            return Json("This is a public endpoint that is at ResourceServer01; it does not require authorization.");
            //return Content("This is a public endpoint that is at ResourceServer01; it does not require authorization.");
        }

        //public ActionResult DownloadFile(string strData)
        //{
        //    var cd = new System.Net.Mime.ContentDisposition { FileName = "test.rar", Inline = false };
        //    byte[] arr = System.IO.File.ReadAllBytes(@"G:\test.rar");

        //    Response.ContentType = "application/x-rar-compressed";
        //    Response.AddHeader("content-disposition", cd.ToString());
        //    Response.Buffer = true;
        //    Response.Clear();
        //    Response.BinaryWrite(arr);
        //    Response.End();

        //    return new FileStreamResult(Response.OutputStream, Response.ContentType);
        //}
        [HttpGet]
        public FileStreamResult DownloadFile(string dataFilePath = "test.txt")
        {
            //string filePath = "test.txt";
            Response.Headers.Add("content-disposition", $"attachment; filename={dataFilePath}");
            return File(
                new System.IO.FileStream(
                    $@".\Data\{dataFilePath}", 
                    FileMode.Open),
                "application/octet-stream"
            ); // or "application/x-rar-compressed"
        }
    }
}
