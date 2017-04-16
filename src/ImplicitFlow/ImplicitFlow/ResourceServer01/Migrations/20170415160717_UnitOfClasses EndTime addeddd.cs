using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ResourceServer01.Migrations
{
    public partial class UnitOfClassesEndTimeaddeddd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "EndTime",
                table: "UnitOfClasses",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Duration",
                table: "UnitOfClasses",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "EndTime",
                table: "UnitOfClasses",
                nullable: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Duration",
                table: "UnitOfClasses",
                nullable: false);
        }
    }
}
