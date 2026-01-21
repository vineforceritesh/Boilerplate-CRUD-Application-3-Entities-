using System.ComponentModel.DataAnnotations;

namespace UserCrud.Collages.Dto
{
    public class CreateCollegeDto
    {
        [Required]
        public string Name { get; set; }

        public string Address { get; set; }
        public long PhoneNumber { get; set; }

        public bool IsActive { get; set; } = true;
    }
}
