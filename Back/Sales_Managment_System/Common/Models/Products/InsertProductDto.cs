using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Sales_Managment_System.Common.Models.Products
{
    public class InsertProductDto
    {
        public string Name { get; set; }
        public int CategoryId { get; set; }
    
        public int UnitsInStock { get; set; }
        public double Price { get; set; }
        public double Discount { get; set; }
    }
}
