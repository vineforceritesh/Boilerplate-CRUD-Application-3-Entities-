using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserCrud.Collages
{
    public class Collage : FullAuditedEntity<int>
    {

        public string Name { get; set; }
        public string Address { get; set; }
        public long PhoneNumber { get; set; }

        public bool IsActive { get; set; }

        
    }


}
