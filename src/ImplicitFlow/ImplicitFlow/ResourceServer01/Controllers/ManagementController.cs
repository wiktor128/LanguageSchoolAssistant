using System.Security.Claims;
using AspNet.Security.OAuth.Introspection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResourceServer01.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using System;
using Newtonsoft.Json.Linq;

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

            var relatedStudents = _context.PersonalProfiles
                .AsNoTracking()
                .Where(s => s.StudentsGroupId == id)
                .ToList()
                .Select(st => { st.StudentsGroupId = null; return st; });


            if (group != null)
            {
                _context.StudentsGroup.Remove(group);
                _context.PersonalProfiles.UpdateRange(relatedStudents);
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
        public void UpdateClasses(UnitOfClasses classes) // TODO
        {
            var tempClasses = classes;
            tempClasses.StudentsGroup = _context
                                            .StudentsGroup
                                            .Where(x => x.StudentsGroupId == tempClasses.StudentsGroupId)
                                            .SingleOrDefault();


            if (classes.UnitOfClassesId == 0)
            {
                _context.Add(tempClasses);
                // create new
            }
            else
            {
                _context.UnitOfClasses.Update(tempClasses);
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
        public IActionResult GetLanguageInstructorWeekSchedule(string loginName)
        {
            // saturday is start of week
            DateTime leftDateMargin;
            DateTime rightDateMargin;

            switch (DateTime.Today.DayOfWeek)
            {
                case DayOfWeek.Saturday:
                    leftDateMargin = DateTime.Today.AddDays(2);
                    break;
                case DayOfWeek.Sunday:
                    leftDateMargin = DateTime.Today.AddDays(1);
                    break;
                default:
                    leftDateMargin = DateTime.Today.AddDays(-(int)DateTime.Today.DayOfWeek);
                    break;
            }
            rightDateMargin = leftDateMargin.AddDays(7);


            int languageInstructorId = _context.PersonalProfiles
                                        .Where(pp => pp.LoginName == loginName)
                                        .SingleOrDefault()
                                        .PersonalProfileId;

            var thisWeekClasses = _context.UnitOfClasses
                                    .Where(
                                        c => c.PersonalProfileId == languageInstructorId
                                        && c.StudentsGroup != null
                                        && c.StartTime > leftDateMargin
                                        && c.StartTime < rightDateMargin
                                    ).ToList();

            foreach (var item in thisWeekClasses)
            {
                if (item.StudentsGroupId != null && item.StudentsGroup == null)
                {
                    item.StudentsGroup = _context.StudentsGroup
                                                    .Where(x => x.StudentsGroupId == item.StudentsGroupId)
                                                    .SingleOrDefault();
                }
            }


            JObject finalClassesList = JObject.FromObject(
                new
                {
                    Monday =
                        from t in thisWeekClasses
                        where t.StartTime.DayOfWeek == DayOfWeek.Monday
                        orderby t.StartTime
                        select t,
                    Tuesday =
                        from t in thisWeekClasses
                        where t.StartTime.DayOfWeek == DayOfWeek.Tuesday
                        orderby t.StartTime
                        select t,
                    Wednesday =
                        from t in thisWeekClasses
                        where t.StartTime.DayOfWeek == DayOfWeek.Wednesday
                        orderby t.StartTime
                        select t,
                    Thursday =
                        from t in thisWeekClasses
                        where t.StartTime.DayOfWeek == DayOfWeek.Thursday
                        orderby t.StartTime
                        select t,
                    Friday =
                        from t in thisWeekClasses
                        where t.StartTime.DayOfWeek == DayOfWeek.Friday
                        orderby t.StartTime
                        select t 
                });

            return Json(finalClassesList);
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
