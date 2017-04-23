using System.Security.Claims;
using AspNet.Security.OAuth.Introspection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;
using System.IO.Compression;
using System.Collections.Generic;

namespace ResourceServer01.Controllers
{
    public class ResourceController : Controller
    {
        private IHostingEnvironment _environment;

        public ResourceController(IHostingEnvironment environment)
        {
            _environment = environment;
        }

        [Authorize(
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

        [HttpPost]
        public void UploadFile(IFormFile file, string unitOfClassesId)
        {
            //string filePath = "test.txt";
            ;
            var x = "";
            var y = x;
            var param = unitOfClassesId;

        }


        //public IActionResult UploadFile()
        //{
        //    var files = HttpContext.Request.Form.Files;
        //    var uploads = Path.Combine(_environment.WebRootPath, "uploads");
        //    foreach (var file in files)
        //    {
        //        if (file.Length > 0)
        //        {
        //            var fileName = ContentDispositionHeaderValue.Parse
        //                (file.ContentDisposition).FileName.Trim('"');
        //            System.Console.WriteLine(fileName);
        //            //file.SaveAs(Path.Combine(uploads, fileName));
        //        }
        //    }

        //    return Ok();
        //}
    }
}
