using System.Security.Claims;
using AspNet.Security.OAuth.Introspection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResourceServer01.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace ResourceServer01.Controllers
{
    [Authorize(ActiveAuthenticationSchemes = OAuthIntrospectionDefaults.AuthenticationScheme)]
    public class ProfileController : Controller
    {
        private ApplicationDbContext _context;

        public ProfileController(ApplicationDbContext applicationDbContext)
        {
            _context = applicationDbContext;
        }

        [HttpPost]
        public IActionResult Get(string loginName)
        {
            var profile = _context.PersonalProfiles
                            .Where( x => x.LoginName == loginName)
                            .SingleOrDefault();

            return Json(profile);
        }

        [HttpPost]
        public IActionResult Image()
        {
            return Json("Return Image here.....");
        }
    }
}
