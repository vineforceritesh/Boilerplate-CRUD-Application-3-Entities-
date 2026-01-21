using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserCrud.Cities.Dto
{
    public class CreateCityDto
    {
        
        public string Name { get; set; }
        public int StateId { get; set; }
        public bool IsActive { get; set; }
    }
}
