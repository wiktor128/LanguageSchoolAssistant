using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ResourceServer01.Migrations
{
    public partial class usefullinks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "IX_UsefulLinks_PersonalProfileId",
                table: "UsefulLinks",
                column: "PersonalProfileId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UsefulLinks");
        }
    }
}
