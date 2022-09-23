using Sales_Managment_System.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales_Managment_System.Common.Models.Invoice
{
    public class InsertInvoiceDto
    {
        public int Id { get; set; }
        public string CustomerId { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public string PaymentInfo { get; set; }
        public double TotalAmount { get; set; }
        public DateTime InvoicedAt { get; set; }
    }
}
