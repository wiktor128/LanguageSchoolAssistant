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

            if (profile == null && !string.IsNullOrWhiteSpace(loginName))
            {
                PersonalProfile newProfile = new PersonalProfile() {
                    FirstName = "",
                    SecondName = "",
                    IsLanguageInstructor = User.IsInRole("LanguageInstructor"),
                    LoginName = loginName,
                    Email = loginName,
                    Telephone = ""
                };
                _context.Add(newProfile);
                _context.SaveChanges();

                return Json(newProfile);
            }
            return Json(profile);
        }

        [HttpPost]
        public void Update(PersonalProfile profile)
        {
            var localStoredProfile =    _context.PersonalProfiles
                                        .Where(x => x.LoginName == profile.LoginName)
                                        .SingleOrDefault();

            //if (localStoredProfile == null)
            //{
            //    _context.Add(profile);
            //}
            /*else*/
            if ( !string.IsNullOrWhiteSpace(profile.LoginName))
            {
                _context.Entry(localStoredProfile).CurrentValues.SetValues(profile);
                _context.SaveChanges();
            }
        }

        [HttpPost]
        public IActionResult Image()
        {
            return Json("Return Image here.....");
        }
    }
}
