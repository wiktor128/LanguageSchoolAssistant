using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ResourceServer01.Migrations
{
    public partial class basicstructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StudentsGroupId",
                table: "PersonalProfiles",
                nullable: true);

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
                    Language = table.Column<string>(nullable: true),
                    Level = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentsGroup", x => x.StudentsGroupId);
                });

            migrationBuilder.CreateTable(
                name: "UnitOfClasses",
                columns: table => new
                {
                    UnitOfClassesId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Duration = table.Column<DateTime>(nullable: false),
                    LanguageInstructorPersonalProfileId = table.Column<int>(nullable: true),
                    LocalizationId = table.Column<int>(nullable: true),
                    ShortDescription = table.Column<string>(nullable: true),
                    StartTime = table.Column<DateTime>(nullable: false),
                    StudentsGroupId = table.Column<int>(nullable: true),
                    Subject = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UnitOfClasses", x => x.UnitOfClassesId);
                    table.ForeignKey(
                        name: "FK_UnitOfClasses_PersonalProfiles_LanguageInstructorPersonalProfileId",
                        column: x => x.LanguageInstructorPersonalProfileId,
                        principalTable: "PersonalProfiles",
                        principalColumn: "PersonalProfileId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UnitOfClasses_Localization_LocalizationId",
                        column: x => x.LocalizationId,
                        principalTable: "Localization",
                        principalColumn: "LocalizationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UnitOfClasses_StudentsGroup_StudentsGroupId",
                        column: x => x.StudentsGroupId,
                        principalTable: "StudentsGroup",
                        principalColumn: "StudentsGroupId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PersonalProfiles_StudentsGroupId",
                table: "PersonalProfiles",
                column: "StudentsGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_UnitOfClasses_LanguageInstructorPersonalProfileId",
                table: "UnitOfClasses",
                column: "LanguageInstructorPersonalProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_UnitOfClasses_LocalizationId",
                table: "UnitOfClasses",
                column: "LocalizationId");

            migrationBuilder.CreateIndex(
                name: "IX_UnitOfClasses_StudentsGroupId",
                table: "UnitOfClasses",
                column: "StudentsGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_PersonalProfiles_StudentsGroup_StudentsGroupId",
                table: "PersonalProfiles",
                column: "StudentsGroupId",
                principalTable: "StudentsGroup",
                principalColumn: "StudentsGroupId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PersonalProfiles_StudentsGroup_StudentsGroupId",
                table: "PersonalProfiles");

            migrationBuilder.DropTable(
                name: "UnitOfClasses");

            migrationBuilder.DropTable(
                name: "Localization");

            migrationBuilder.DropTable(
                name: "StudentsGroup");

            migrationBuilder.DropIndex(
                name: "IX_PersonalProfiles_StudentsGroupId",
                table: "PersonalProfiles");

            migrationBuilder.DropColumn(
                name: "StudentsGroupId",
                table: "PersonalProfiles");
        }
    }
}
