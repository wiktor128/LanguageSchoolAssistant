using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace ResourceServer01.Models
{
    public class UnitOfClasses
    {
        public int UnitOfClassesId { get; set; }
        public string Subject { get; set; }
        public string ShortDescription { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime Duration { get; set; }
        public int? PersonalProfileId { get; set; }
        [ForeignKey("PersonalProfileId")]
        public PersonalProfile LanguageInstructor { get; set; }
        public int? LocalizationId { get; set; }
        [ForeignKey("LocalizationId")]
        public Localization Localization { get; set; }

        public int? StudentsGroupId { get; set; }
        [ForeignKey("StudentsGroupId")]
        public StudentsGroup StudentsGroup { get; set; }
    }
}
