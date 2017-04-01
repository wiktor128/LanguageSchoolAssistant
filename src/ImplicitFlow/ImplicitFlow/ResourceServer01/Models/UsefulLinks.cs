using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace ResourceServer01.Models
{
    public class UsefulLink
    {
        public int UsefulLinkId { get; set; }
        public string Link { get; set; }
        public string Title { get; set; }
        public string Color { get; set; }
        public int? PersonalProfileId { get; set; }
        [ForeignKey("PersonalProfileId")]
        public PersonalProfile PersonalProfile { get; set;}
    }
}
