using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using UserCrud.Cities;
using UserCrud.Collages;
using UserCrud.Countries;
using UserCrud.States;

namespace UserCrud.Students
{
    public class Student : FullAuditedEntity<int>
    {
        public string Name { get; set; }

        public string? Surname { get; set; }



        public string Email { get; set; }

        [Range(18, 60, ErrorMessage = "Age must be between 18 and 60")]
        public int Age { get; set; }

        public int CollageId { get; set; }
        public Collage Collage { get; set; }

        public int CountryId { get; set; }
        public Country Country { get; set; }

        public int StateId { get; set; }
        public State State { get; set; }

        public int CityId { get; set; }
     
        public City City { get; set; }
    }


}
