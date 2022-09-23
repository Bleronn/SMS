using Sales_Managment_System.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales_Managment_System.Common.Entities
{
    public class Invoice : BaseEntity
    {
        public int Id { get; set; }
        public string CustomerId { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public string PaymentInfo { get; set; }
        public double TotalAmount { get; set; }
        public DateTime InvoicedAt { get; set; }

        public Customer Customer { get; set; }
        public List<InvoiceItem> Items { get; set; } = new List<InvoiceItem>();
    }
}
