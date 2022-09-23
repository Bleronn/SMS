using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales_Managment_System.Common.Entities
{
    public class ProductUnit : BaseEntity
    {
        public int Id { get; set; }
        public int ProductId { get; set; }

        public Product Product { get; set; }
    }
}
