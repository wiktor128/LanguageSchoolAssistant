using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ResourceServer01.Models
{
    public class UsefulLink
    {
        public int UsefulLinkId { get; set; }
        public string Link { get; set; }
        public string Title { get; set; }
        public string Color { get; set; }
        public PersonalProfile PersonalProfile { get; set;}
    }
}
