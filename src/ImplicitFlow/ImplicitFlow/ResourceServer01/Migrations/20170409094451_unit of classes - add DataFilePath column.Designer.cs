using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using ResourceServer01.Models;

namespace ResourceServer01.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20170409094451_unit of classes - add DataFilePath column")]
    partial class unitofclassesaddDataFilePathcolumn
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ResourceServer01.Models.Localization", b =>
                {
                    b.Property<int>("LocalizationId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<bool>("Online");

                    b.HasKey("LocalizationId");

                    b.ToTable("Localization");
                });

            modelBuilder.Entity("ResourceServer01.Models.PersonalProfile", b =>
                {
                    b.Property<int>("PersonalProfileId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<bool>("IsLanguageInstructor");

                    b.Property<string>("LoginName");

                    b.Property<string>("SecondName");

                    b.Property<int?>("StudentsGroupId");

                    b.Property<string>("Telephone");

                    b.HasKey("PersonalProfileId");

                    b.HasIndex("StudentsGroupId");

                    b.ToTable("PersonalProfiles");
                });

            modelBuilder.Entity("ResourceServer01.Models.StudentsGroup", b =>
                {
                    b.Property<int>("StudentsGroupId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("EndDate");

                    b.Property<string>("Language");

                    b.Property<string>("Level");

                    b.Property<string>("Name");

                    b.Property<DateTime?>("StartDate");

                    b.HasKey("StudentsGroupId");

                    b.ToTable("StudentsGroup");
                });

            modelBuilder.Entity("ResourceServer01.Models.UnitOfClasses", b =>
                {
                    b.Property<int>("UnitOfClassesId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("DataFilePath");

                    b.Property<DateTime>("Duration");

                    b.Property<int?>("LocalizationId");

                    b.Property<int?>("PersonalProfileId");

                    b.Property<string>("ShortDescription");

                    b.Property<DateTime>("StartTime");

                    b.Property<int?>("StudentsGroupId");

                    b.Property<string>("Subject");

                    b.HasKey("UnitOfClassesId");

                    b.HasIndex("LocalizationId");

                    b.HasIndex("PersonalProfileId");

                    b.HasIndex("StudentsGroupId");

                    b.ToTable("UnitOfClasses");
                });

            modelBuilder.Entity("ResourceServer01.Models.UsefulLink", b =>
                {
                    b.Property<int>("UsefulLinkId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Color");

                    b.Property<string>("Link");

                    b.Property<int?>("PersonalProfileId");

                    b.Property<string>("Title");

                    b.HasKey("UsefulLinkId");

                    b.HasIndex("PersonalProfileId");

                    b.ToTable("UsefulLinks");
                });

            modelBuilder.Entity("ResourceServer01.Models.PersonalProfile", b =>
                {
                    b.HasOne("ResourceServer01.Models.StudentsGroup", "StudentsGroup")
                        .WithMany()
                        .HasForeignKey("StudentsGroupId");
                });

            modelBuilder.Entity("ResourceServer01.Models.UnitOfClasses", b =>
                {
                    b.HasOne("ResourceServer01.Models.Localization", "Localization")
                        .WithMany()
                        .HasForeignKey("LocalizationId");

                    b.HasOne("ResourceServer01.Models.PersonalProfile", "LanguageInstructor")
                        .WithMany()
                        .HasForeignKey("PersonalProfileId");

                    b.HasOne("ResourceServer01.Models.StudentsGroup", "StudentsGroup")
                        .WithMany()
                        .HasForeignKey("StudentsGroupId");
                });

            modelBuilder.Entity("ResourceServer01.Models.UsefulLink", b =>
                {
                    b.HasOne("ResourceServer01.Models.PersonalProfile", "PersonalProfile")
                        .WithMany()
                        .HasForeignKey("PersonalProfileId");
                });
        }
    }
}
