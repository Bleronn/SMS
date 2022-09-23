using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales_Managment_System.Common.Models.Sale
{
    public class InsertSaleDto
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public string UserId { get; set; }
        public int Quantity { get; set; }
        public double UnitPrice { get; set; }
        public double Discount { get; set; }

       

    }
}
