using System.Runtime.CompilerServices;
using Api.Data;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Api.controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController: ControllerBase
    {
        private readonly appDbContext _context;
        public StudentsController(appDbContext context)
        {
            _context= context;
        }
        [HttpGet]
        public async Task<IEnumerable<Student>> GetStudents(){
            var students = await _context.Students.AsNoTracking().ToListAsync();
            return students;
        }
        [HttpPost]
        public async Task<IActionResult> Create(Student student){
            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            await _context.AddAsync(student);
            var result= await _context.SaveChangesAsync();

            if(result > 0){
                return Ok();
            }
            return BadRequest();

        }
        [HttpGet("id: int")]
        public async Task<ActionResult<Student>> GetStudent(int id){
            var student= await _context.Students.FindAsync(id);

            if(student is null){
                return NotFound();
            }
            return Ok(student);
        }
        [HttpDelete("id:int")]
        public async Task<IActionResult> Delete(int id){
            var student = await _context.Students.FindAsync(id);
            if(student is null)
            {
                return NotFound();
            }
            _context.Remove(student);
            var result = await _context.SaveChangesAsync();
            if(result > 0){
                return Ok("Student Deleted");
            }
            return BadRequest("Unable to delete student");
        }

        [HttpPut("id: int")]
        public async Task<IActionResult> EditSudent(int id, Student student){
            var studentFromDb = await _context.Students.FindAsync(id);
            if(student is null){
                return BadRequest("Student not found");
            }

            studentFromDb.name = student.name;
            studentFromDb.phoneNumber = student.phoneNumber;
            studentFromDb.address = student.address;
            studentFromDb.email = student.email;

            var result = await _context.SaveChangesAsync();

            if(result > 0){
                return Ok();
            }
            
            return BadRequest();
        }

    }
}