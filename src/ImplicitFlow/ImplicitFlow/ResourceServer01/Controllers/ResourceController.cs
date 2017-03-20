using System.Security.Claims;
using AspNet.Security.OAuth.Introspection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ResourceServer01.Controllers
{
    public class ResourceController : Controller
    {
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
    }
}
