using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Countries;
using UserCrud.States;

namespace UserCrud.Cities
{
    public class City : FullAuditedEntity<int>
    {
        public string Name { get; set; }

        public int StateId { get; set; }
      

        public bool IsActive { get; set; }

    }


}
