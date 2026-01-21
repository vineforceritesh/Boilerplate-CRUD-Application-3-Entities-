using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserCrud.Countries.Dto
{
    public class CreateCountryDto
    {
        public string Name { get; set; }
        public bool IsActive { get; set; }
    }

}
