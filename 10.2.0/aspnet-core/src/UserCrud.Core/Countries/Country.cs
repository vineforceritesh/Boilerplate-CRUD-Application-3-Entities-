using Abp.Domain.Entities.Auditing;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserCrud.Countries
{
    public class Country : FullAuditedEntity<int>
    {
        public string Name { get; set; }
        public bool IsActive { get; set; } = true;
    }

}
