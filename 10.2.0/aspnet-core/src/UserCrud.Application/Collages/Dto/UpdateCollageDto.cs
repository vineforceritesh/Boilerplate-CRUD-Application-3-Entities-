using System.ComponentModel.DataAnnotations;

namespace UserCrud.Collages.Dto
{
    public class UpdateCollegeDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

      
        public long PhoneNumber { get; set; }

        public int CityId { get; set; }

        public bool IsActive { get; set; }
    }
}
