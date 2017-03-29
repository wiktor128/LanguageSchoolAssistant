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
    public class ManagementController : Controller
    {
        private ApplicationDbContext _context;

        public ManagementController(ApplicationDbContext applicationDbContext)
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
        public void UpdateGroup(StudentsGroup group)
        {
            var x = group;

            if (x.Name == null)
            {
                ;
            } else
            {
                ;
            }
        }


        [HttpPost]
        public IActionResult GetUsefulLinks(string loginName)
        {
            var personalProfile = _context.PersonalProfiles
                                    .Where(x => x.LoginName == loginName)
                                    .SingleOrDefault();

            var usefulLinks = _context.UsefulLinks
                            .Where(x => x.PersonalProfile == personalProfile)
                            .ToList();


            return Json(usefulLinks);
        }

        [HttpPost]
        public IActionResult AddUsefulLink(UsefulLink usefulLink)
        {
            var personalProfile = _context.PersonalProfiles
                                    .Where(x => x.LoginName == User.Identity.Name)
                                    .SingleOrDefault();

            usefulLink.PersonalProfile = personalProfile;



            _context.Add(usefulLink);

            _context.SaveChanges();

            var usefulLinks = _context.UsefulLinks
                            .Where(x => x.PersonalProfile == personalProfile);

            return Json(usefulLinks);
        }



    }
}
