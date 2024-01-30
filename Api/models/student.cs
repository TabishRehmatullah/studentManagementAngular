using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class Student{
        public int id { get; set; }
        [Required]
        public string name { get; set; } = string.Empty;
        public string? address { get; set; }
        public string? phoneNumber { get; set; }
        public string? email { get; set; }

    }
}