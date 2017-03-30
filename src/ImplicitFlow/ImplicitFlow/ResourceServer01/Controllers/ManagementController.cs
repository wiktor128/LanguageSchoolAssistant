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
        public IActionResult GetAllGroups()
        {
            var allGroups = _context.StudentsGroup.ToList();

            return Json(allGroups);
        }

        [HttpPost]
        public void UpdateGroup(StudentsGroup group) // TODO
        {
            var x = group;
            if (group.StudentsGroupId == 0)
            {
                _context.Add(group);
                // create new
            }
            else
            {
                // update existing
                ;
            }
            _context.SaveChanges();
            return;
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
