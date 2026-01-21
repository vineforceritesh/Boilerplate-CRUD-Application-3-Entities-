using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Countries;

namespace UserCrud.States
{
    public class State : FullAuditedEntity<int>
    {
        public string Name { get; set; }
        public int CountryId { get; set; }


        
  
        public bool IsActive { get; set; }
    }

}
