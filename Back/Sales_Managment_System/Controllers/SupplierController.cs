using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sales_Managment_System.Common.Entities;
using Sales_Managment_System.Common.Models;
using Sales_Managment_System.Common.Models.Products;
using Sales_Managment_System.Common.Models.Supplier;
using Sales_Managment_System.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales_Managment_System.Controllers
{
    [Authorize]
    public class SupplierController : BaseController
    {
        private readonly DataContext _context;

        public SupplierController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSuppliers()
        {
            return Ok(await _context.Suppliers.ToListAsync());
        }

        [HttpGet("{supplierId}")]
        public async Task<IActionResult> GetSupplier(string supplierId)
        {
            var supplier = await _context.Suppliers.FirstOrDefaultAsync(p => p.Id == supplierId);
            if (supplier == null)
            {
                return BadRequest();
            }

            return Ok(supplier);
        }

        [HttpPost]
        public async Task<IActionResult> InsertSupplier([FromBody] InsertSupplierDto supplierDto)
        {
            var supplier = new Supplier
            {
                Id = Guid.NewGuid().ToString(),
                Name = supplierDto.Name,
                Contact = supplierDto.Contact,
                Address = supplierDto.Address,
                Email = supplierDto.Email,
                InsertedAt = DateTime.UtcNow,
            };

            _context.Suppliers.Add(supplier);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success", Id = supplier.Id.ToString() });
        }

        [HttpPut("{supplierId}")]
        public async Task<IActionResult> EditSupplier(string supplierId, [FromBody] InsertSupplierDto supplierDto)
        {
            var supplier = await _context.Suppliers.FirstOrDefaultAsync(p => p.Id == supplierId);
            if (supplierDto == null)
            {
                return BadRequest();
            }

            supplier.Name = supplierDto.Name;
            supplier.Contact = supplierDto.Contact;
            supplier.Address = supplierDto.Address;
            supplier.Email = supplierDto.Email;
            supplier.UpdatedAt = DateTime.UtcNow;

            _context.Suppliers.Update(supplier);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success", Id = supplier.Id });
        }

        [HttpDelete("{supplierId}")]
        public async Task<IActionResult> DeleteSupplier(string supplierId)
        {
            var supplier = await _context.Suppliers.FirstOrDefaultAsync(p => p.Id == supplierId);
            if (supplier == null)
            {
                return BadRequest();
            }

            _context.Suppliers.Remove(supplier);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success" });
        }

    }
}
