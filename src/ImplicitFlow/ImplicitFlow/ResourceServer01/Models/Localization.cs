using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ResourceServer01.Models
{
    public class Localization
    {
        public int LocalizationId { get; set; }
        public bool Online { get; set; }
        public string Description { get; set; }
        // GOOGLE COORDINATES
    }
}
