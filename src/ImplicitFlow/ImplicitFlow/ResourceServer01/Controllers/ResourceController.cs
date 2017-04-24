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
using ResourceServer01.Models;
using System.Linq;

namespace ResourceServer01.Controllers
{
    public class ResourceController : Controller
    {
        private IHostingEnvironment _environment;
        private ApplicationDbContext _context;

        public ResourceController(IHostingEnvironment environment, ApplicationDbContext applicationDbContext)
        {
            _environment = environment;
            _context = applicationDbContext;
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
        public FileStreamResult DownloadFile(string unitOfClassesId )
        {

            string contentSaveDirectory = $"{_environment.ContentRootPath}\\Data\\{unitOfClassesId}";
            string zipFileName = $"{unitOfClassesId}.zip";
            string zipFilePath = $"{_environment.ContentRootPath}\\Data\\{zipFileName}";

            //ZipArchive zipArchive = null;

            if (Directory.Exists(contentSaveDirectory))
            {
                ZipFile.CreateFromDirectory(contentSaveDirectory, zipFilePath);
                //zipArchive = ZipFile.OpenRead(zipFilePath);
            }


            Response.Headers.Add("content-disposition", $"attachment; filename={zipFileName}");
            return File(
                new System.IO.FileStream(
                    zipFilePath,
                    FileMode.Open),
                "application/octet-stream"
            ); // or "application/x-rar-compressed"

        }

        [HttpPost]
        public void UploadFile(IFormFile file, string unitOfClassesId)
        {
            var contentSaveDirectory = $"{_environment.ContentRootPath}\\Data\\{unitOfClassesId}";

            if (!Directory.Exists(contentSaveDirectory))
            {
                Directory.CreateDirectory(contentSaveDirectory);
            }

            if (!System.IO.File.Exists($"{contentSaveDirectory}\\{file.FileName}"))
            {
                file.CopyTo(new FileStream($"{contentSaveDirectory}\\{file.FileName}", FileMode.Create));
            }

            var classToUpdate = _context.UnitOfClasses
                                    .Where(x => x.UnitOfClassesId == int.Parse(unitOfClassesId))
                                    .SingleOrDefault();

            classToUpdate.DataFilePath = unitOfClassesId;
            _context.UnitOfClasses.Update(classToUpdate);
        
            _context.SaveChanges();
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
