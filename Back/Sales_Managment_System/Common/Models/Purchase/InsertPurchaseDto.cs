using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales_Managment_System.Common.Models.Purchase
{
    public class InsertPurchaseDto
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public int Quantity { get; set; }
        public string SupplierId { get; set; }
        public double UnitPrice { get; set; }
        public double Discount { get; set; }
    }
}
