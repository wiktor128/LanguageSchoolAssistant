using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ResourceServer01.Migrations
{
    public partial class changeStudentsGroupdatetiemattributestonullabledatetime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "StartDate",
                table: "StudentsGroup",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndDate",
                table: "StudentsGroup",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "StartDate",
                table: "StudentsGroup",
                nullable: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndDate",
                table: "StudentsGroup",
                nullable: false);
        }
    }
}
