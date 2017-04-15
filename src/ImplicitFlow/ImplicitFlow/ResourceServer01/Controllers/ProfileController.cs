using System.Security.Claims;
using AspNet.Security.OAuth.Introspection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResourceServer01.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;

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

        //[Authorize( Roles = "LanguageInstructor" )]
        //public IActionResult GetAllStudents()
        //{
        //    var allStudents = _context.PersonalProfiles
        //                      .Where(x => x.IsLanguageInstructor == false);

        //    return Json(allStudents);
        //}

        //[Authorize(Roles = "LanguageInstructor")]
        //public IActionResult GetAllStudents(StudentsGroup studentGroup)
        //{ // check this

        //    var studentsInGroup = from pp in _context.PersonalProfiles
        //                          where pp.StudentsGroup == studentGroup
        //                             && pp.IsLanguageInstructor == false
        //                          select pp;
                                            

        //    return Json(studentsInGroup);
        //}

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

        [HttpPost]
        public IActionResult GetRelatedClasses(string loginName)
        {
            var profile = _context.PersonalProfiles
                            .Where(p => p.LoginName == loginName)
                            .SingleOrDefault();

            string x = profile.ToString();

            var relatedClasses = _context.UnitOfClasses
                                    .Where(y =>
                                        y.StudentsGroupId == profile.StudentsGroupId
                                        //&& y.StartTime > DateTime.Today.AddMonths(-3)
                                        //&& y.StartTime < DateTime.Today.AddMonths(+3)
                                    ).ToList();

            return Json(relatedClasses);
        }

        [HttpPost]
        public IActionResult Image()
        {
            return Json("Return Image here.....");
        }
    }
}
