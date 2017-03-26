using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ResourceServer01.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        { }

        public DbSet<PersonalProfile> PersonalProfiles { get; set; }
        public DbSet<Localization> Localization { get; set; }
        public DbSet<StudentsGroup> StudentsGroup { get; set; }
        public DbSet<UnitOfClasses> UnitOfClasses { get; set; }
        public DbSet<UsefulLink> UsefulLinks { get; set; }
    }
}
