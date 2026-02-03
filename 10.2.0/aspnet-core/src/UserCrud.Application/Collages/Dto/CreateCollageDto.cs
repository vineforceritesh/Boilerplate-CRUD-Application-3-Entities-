using System.ComponentModel.DataAnnotations;

namespace UserCrud.Collages.Dto
{
    public class CreateCollegeDto
    {
        [Required]
        public string Name { get; set; }

      
        public int CityId { get; set; }
        public long PhoneNumber { get; set; }

        public bool IsActive { get; set; } = true;
    }
}
