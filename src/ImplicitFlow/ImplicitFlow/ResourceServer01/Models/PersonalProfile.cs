using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ResourceServer01.Models
{
    public class PersonalProfile
    {
        public int PersonalProfileId { get; set; }
        public bool IsLanguageInstructor { get; set; }
        public string LoginName { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
    }
}
