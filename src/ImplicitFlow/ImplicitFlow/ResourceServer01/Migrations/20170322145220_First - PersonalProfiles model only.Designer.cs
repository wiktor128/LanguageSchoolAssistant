using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using ResourceServer01.Models;

namespace ResourceServer01.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20170322145220_First - PersonalProfiles model only")]
    partial class FirstPersonalProfilesmodelonly
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ResourceServer01.Models.PersonalProfile", b =>
                {
                    b.Property<int>("PersonalProfileId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<bool>("IsLanguageInstructor");

                    b.Property<string>("LoginName");

                    b.Property<string>("SecondName");

                    b.Property<string>("Telephone");

                    b.HasKey("PersonalProfileId");

                    b.ToTable("PersonalProfiles");
                });
        }
    }
}
