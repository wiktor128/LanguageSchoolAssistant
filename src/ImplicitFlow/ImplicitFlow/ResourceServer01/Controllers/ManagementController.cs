using System.Security.Claims;
using AspNet.Security.OAuth.Introspection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResourceServer01.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;

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
        public IActionResult GetGroup(int? id)
        {
            var group = _context.StudentsGroup.Where(x => x.StudentsGroupId == id).SingleOrDefault();

            return Json(group);
        }

        [HttpPost]
        public IActionResult GetAllGroups()
        {
            var allGroups = _context.StudentsGroup.ToList();

            return Json(allGroups);
        }

        [HttpPost]
        public IActionResult GetAllStudents()
        {
            var allStudents = _context.PersonalProfiles.Where(x => x.IsLanguageInstructor == false).ToList();

            return Json(allStudents);
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
        }

        [HttpPost]
        public void DeleteGroup(int? id)
        {
            var group = _context.StudentsGroup
                .AsNoTracking()
                .SingleOrDefault( g => g.StudentsGroupId == id);

            if (group != null)
            {
                _context.StudentsGroup.Remove(group);
                _context.SaveChanges();
            }
        }

        [HttpPost] 
        public void UpdateStudentGroup(PersonalProfile student)
        {
            var tempStudent = _context.PersonalProfiles
                                .Where(
                                    s => s.IsLanguageInstructor == false
                                    && s.PersonalProfileId == student.PersonalProfileId
                                ).SingleOrDefault();
            tempStudent.StudentsGroupId = student.StudentsGroupId;
            tempStudent.StudentsGroup = _context.StudentsGroup
                                            .Where(x => x.StudentsGroupId == student.StudentsGroupId)
                                            .SingleOrDefault();

            _context.PersonalProfiles.Update(tempStudent);
            _context.SaveChanges();
        }

        [HttpPost]
        public void UpdateClasses([Bind("UnitOfClassesId, Subject, ShortDescription, StartTime, Duration, LanguageInstructor, Localization, StudentsGroupId")]UnitOfClasses classes) // TODO
        {
            var x = classes;
            if (classes.UnitOfClassesId == 0)
            {
                _context.Add(classes);
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
