using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ResourceServer01.Models
{
    public class StudentsGroup
    {
        public int StudentsGroupId { get; set; }
        public string Name { get; set; }
        public string Language { get; set; }
        public string Level { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
