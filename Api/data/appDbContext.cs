using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Data {
    public class appDbContext : DbContext{
        public appDbContext(DbContextOptions<appDbContext> options):base(options)
        {
            
        }
        public DbSet<Student>Students{get ; set;}

    }
}