using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sales_Managment_System.Common.Entities;
using Sales_Managment_System.Common.Models;
using Sales_Managment_System.Common.Models.InvoiceItem;
using Sales_Managment_System.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales_Managment_System.Controllers
{
    [Authorize]
    public class InvoiceItemController : BaseController
    {
        private readonly DataContext _context;

        public InvoiceItemController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllInvoiceItems()
        {
            return Ok(await _context.InvoiceItems.ToListAsync());
        }

        [HttpGet("{invoiceItemId}")]
        public async Task<IActionResult> GetInvoiceItem(int invoiceItemId)
        {
            var invoiceItem = await _context.InvoiceItems.FirstOrDefaultAsync(s => s.Id == invoiceItemId);
            if (invoiceItem == null)
            {
                return BadRequest();
            }

            return Ok(invoiceItem);
        }

        [HttpPost]
        public async Task<IActionResult> InsertInvoiceItem([FromBody] InsertInvoiceItemDto invoiceItemDto)
        {
            var invoiceItem = new InvoiceItem
            {


                ProductId = invoiceItemDto.ProductId,
                InvoiceId = invoiceItemDto.InvoiceId,
                Quantity = invoiceItemDto.Quantity,
                Price = invoiceItemDto.Price,
                Discount = invoiceItemDto.Discount,
             
            };

            _context.InvoiceItems.Add(invoiceItem);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success", Id = invoiceItem.Id.ToString() });
        }

        [HttpPut("{invoiceItemId}")]
        public async Task<IActionResult> EditInvoiceItem(int invoiceItemId, [FromBody] InsertInvoiceItemDto invoiceItemDto)
        {
            var invoiceItem = await _context.InvoiceItems.FirstOrDefaultAsync(s => s.Id == invoiceItemId);
            if (invoiceItem == null)
            {
                return BadRequest();
            }

            invoiceItem.ProductId = invoiceItemDto.ProductId;
            invoiceItem.InvoiceId = invoiceItemDto.InvoiceId;
            invoiceItem.Quantity = invoiceItemDto.Quantity;
            invoiceItem.Price = invoiceItemDto.Price;
            invoiceItem.Discount = invoiceItemDto.Discount;

           

            _context.InvoiceItems.Update(invoiceItem);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success", Id = invoiceItem.Id.ToString() });
        }

        [HttpDelete("{invoiceItemId}")]
        public async Task<IActionResult> DeletePInvoiceItems(int invoiceItemId)
        {
            var invoiceItem = await _context.InvoiceItems.FirstOrDefaultAsync(c => c.Id == invoiceItemId);
            if (invoiceItem == null)
            {
                return BadRequest();
            }

            _context.InvoiceItems.Remove(invoiceItem);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success" });
        }
    }
}

