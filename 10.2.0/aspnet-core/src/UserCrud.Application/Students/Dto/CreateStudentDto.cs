using System.ComponentModel.DataAnnotations;

namespace UserCrud.Students.Dto
{
    public class CreateStudentDto
    {
        [Required]
        public string Name { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public int Age { get; set; }

        [Required]
        public int CollageId { get; set; }   
        [Required]
        public int CountryId { get; set; }
        [Required]
        public int StateId { get; set; }
        [Required]
        public int CityId { get; set; }
        
        
    }
}
