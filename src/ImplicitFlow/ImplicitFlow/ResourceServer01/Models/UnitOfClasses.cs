using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ResourceServer01.Models
{
    public class UnitOfClasses
    {
        public int UnitOfClassesId { get; set; }
        public string Subject { get; set; }
        public string ShortDescription { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime Duration { get; set; }
        public PersonalProfile LanguageInstructor { get; set; }
        public Localization Localization { get; set; }
        public StudentsGroup StudentsGroup { get; set; }
    }
}
