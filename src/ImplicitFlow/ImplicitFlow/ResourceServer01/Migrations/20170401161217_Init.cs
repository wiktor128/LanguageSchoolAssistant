using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ResourceServer01.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Localization",
                columns: table => new
                {
                    LocalizationId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(nullable: true),
                    Online = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Localization", x => x.LocalizationId);
                });

            migrationBuilder.CreateTable(
                name: "StudentsGroup",
                columns: table => new
                {
                    StudentsGroupId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EndDate = table.Column<DateTime>(nullable: true),
                    Language = table.Column<string>(nullable: true),
                    Level = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentsGroup", x => x.StudentsGroupId);
                });

            migrationBuilder.CreateTable(
                name: "PersonalProfiles",
                columns: table => new
                {
                    PersonalProfileId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Email = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    IsLanguageInstructor = table.Column<bool>(nullable: false),
                    LoginName = table.Column<string>(nullable: true),
                    SecondName = table.Column<string>(nullable: true),
                    StudentsGroupId = table.Column<int>(nullable: true),
                    Telephone = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonalProfiles", x => x.PersonalProfileId);
                    table.ForeignKey(
                        name: "FK_PersonalProfiles_StudentsGroup_StudentsGroupId",
                        column: x => x.StudentsGroupId,
                        principalTable: "StudentsGroup",
                        principalColumn: "StudentsGroupId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UnitOfClasses",
                columns: table => new
                {
                    UnitOfClassesId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Duration = table.Column<DateTime>(nullable: false),
                    LocalizationId = table.Column<int>(nullable: true),
                    PersonalProfileId = table.Column<int>(nullable: true),
                    ShortDescription = table.Column<string>(nullable: true),
                    StartTime = table.Column<DateTime>(nullable: false),
                    StudentsGroupId = table.Column<int>(nullable: true),
                    Subject = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UnitOfClasses", x => x.UnitOfClassesId);
                    table.ForeignKey(
                        name: "FK_UnitOfClasses_Localization_LocalizationId",
                        column: x => x.LocalizationId,
                        principalTable: "Localization",
                        principalColumn: "LocalizationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UnitOfClasses_PersonalProfiles_PersonalProfileId",
                        column: x => x.PersonalProfileId,
                        principalTable: "PersonalProfiles",
                        principalColumn: "PersonalProfileId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UnitOfClasses_StudentsGroup_StudentsGroupId",
                        column: x => x.StudentsGroupId,
                        principalTable: "StudentsGroup",
                        principalColumn: "StudentsGroupId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UsefulLinks",
                columns: table => new
                {
                    UsefulLinkId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Color = table.Column<string>(nullable: true),
                    Link = table.Column<string>(nullable: true),
                    PersonalProfileId = table.Column<int>(nullable: true),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsefulLinks", x => x.UsefulLinkId);
                    table.ForeignKey(
                        name: "FK_UsefulLinks_PersonalProfiles_PersonalProfileId",
                        column: x => x.PersonalProfileId,
                        principalTable: "PersonalProfiles",
                        principalColumn: "PersonalProfileId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PersonalProfiles_StudentsGroupId",
                table: "PersonalProfiles",
                column: "StudentsGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_UnitOfClasses_LocalizationId",
                table: "UnitOfClasses",
                column: "LocalizationId");

            migrationBuilder.CreateIndex(
                name: "IX_UnitOfClasses_PersonalProfileId",
                table: "UnitOfClasses",
                column: "PersonalProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_UnitOfClasses_StudentsGroupId",
                table: "UnitOfClasses",
                column: "StudentsGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_UsefulLinks_PersonalProfileId",
                table: "UsefulLinks",
                column: "PersonalProfileId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UnitOfClasses");

            migrationBuilder.DropTable(
                name: "UsefulLinks");

            migrationBuilder.DropTable(
                name: "Localization");

            migrationBuilder.DropTable(
                name: "PersonalProfiles");

            migrationBuilder.DropTable(
                name: "StudentsGroup");
        }
    }
}
