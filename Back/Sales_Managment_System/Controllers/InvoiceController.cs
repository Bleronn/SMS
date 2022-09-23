using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sales_Managment_System.Common.Entities;
using Sales_Managment_System.Common.Models;
using Sales_Managment_System.Common.Models.Invoice;
using Sales_Managment_System.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales_Managment_System.Controllers
{
    [Authorize]
    public class InvoiceController : BaseController
    {
        private readonly DataContext _context;

        public InvoiceController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllInvoices()
        {
            return Ok(await _context.Invoices.ToListAsync());
        }

        [HttpGet("{invoiceId}")]
        public async Task<IActionResult> GetInvoice(int invoiceId)
        {
            var invoice = await _context.Invoices.FirstOrDefaultAsync(s => s.Id == invoiceId);
            if (invoice == null)
            {
                return BadRequest();
            }

            return Ok(invoice);
        }

        [HttpPost]
        public async Task<IActionResult> InsertInvoice([FromBody] InsertInvoiceDto invoiceDto)
        {
            var invoice = new Invoice
            {
                

                CustomerId = invoiceDto.CustomerId,
             PaymentMethod = invoiceDto.PaymentMethod,
             PaymentInfo = invoiceDto.PaymentInfo,
             TotalAmount = invoiceDto.TotalAmount,

                InsertedAt = DateTime.UtcNow,
            };

            _context.Invoices.Add(invoice);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success", Id = invoice.Id.ToString() });
        }

        [HttpPut("{invoiceId}")]
        public async Task<IActionResult> EditInvoice(int invoiceId, [FromBody] InsertInvoiceDto invoiceDto)
        {
            var invoice = await _context.Invoices.FirstOrDefaultAsync(s => s.Id == invoiceId);
            if (invoice == null)
            {
                return BadRequest();
            }
          
            invoice.CustomerId = invoiceDto.CustomerId;
            invoice.PaymentMethod = invoiceDto.PaymentMethod;
            invoice.PaymentInfo = invoiceDto.PaymentInfo;
            invoice.TotalAmount = invoiceDto.TotalAmount;

            invoice.UpdatedAt = DateTime.UtcNow;

            _context.Invoices.Update(invoice);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success", Id = invoice.Id.ToString() });
        }

        [HttpDelete("{invoiceId}")]
        public async Task<IActionResult> DeletePInvoices(int invoiceId)
        {
            var invoice = await _context.Invoices.FirstOrDefaultAsync(c => c.Id == invoiceId);
            if (invoice == null)
            {
                return BadRequest();
            }

            _context.Invoices.Remove(invoice);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success" });
        }
    }
}

