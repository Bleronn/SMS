using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales_Managment_System.Common.Entities
{
    public class Customer : BaseEntity
    {
        public String Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Contact { get; set; }
        public string Address { get; set; }

        public List<Invoice> Invoices { get; set; } = new List<Invoice>();
    }
}
