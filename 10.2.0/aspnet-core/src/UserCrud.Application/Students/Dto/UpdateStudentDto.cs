using System.ComponentModel.DataAnnotations;

namespace UserCrud.Students.Dto
{
    public class UpdateStudentDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string? Surname { get; set; }

        public string Email { get; set; }

        public int Age { get; set; }

        [Required]
        public int CollegeId { get; set; }

        public int CountryId { get; set; }
        public int StateId { get; set; }
        public int CityId { get; set; }
    }
}
