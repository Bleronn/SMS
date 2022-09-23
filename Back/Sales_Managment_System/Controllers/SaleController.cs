using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sales_Managment_System.Common.Entities;
using Sales_Managment_System.Common.Models;
using Sales_Managment_System.Common.Models.Sale;
using Sales_Managment_System.Persistence;
using System;
using System.Threading.Tasks;

namespace Sales_Managment_System.Controllers
{
    [Authorize]
    public class SaleController : BaseController
    {
        private readonly DataContext _context;

        public SaleController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSales()
        {
            return Ok(await _context.Sales.Include(s => s.User).ToListAsync());
        }

        [HttpGet("{saleId}")]
        public async Task<IActionResult> GetSale(int saleId)
        {
            var sale = await _context.Sales.FirstOrDefaultAsync(s => s.Id == saleId);
            if (sale == null)
            {
                return BadRequest();
            }

            return Ok(sale);
        }

        [HttpPost]
        public async Task<IActionResult> InsertSale([FromBody] InsertSaleDto saleDto)
        {
            var sale = new Sale
            {
                
                InvoiceId = saleDto.InvoiceId,
                UserId = saleDto.UserId,
                Quantity = saleDto.Quantity,
                UnitPrice = saleDto.UnitPrice,
                Discount = saleDto.Discount,
                InsertedAt = DateTime.UtcNow,
            };

            _context.Sales.Add(sale);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success", Id = sale.Id.ToString() });
        }

        [HttpPut("{saleId}")]
        public async Task<IActionResult> EditSale(int saleId, [FromBody] InsertSaleDto saleDto)
        {
            var sale = await _context.Sales.FirstOrDefaultAsync(s => s.Id == saleId);
            if (sale == null)
            {
                return BadRequest();
            }

            sale.InvoiceId = saleDto.InvoiceId;
            sale.UserId = saleDto.UserId;
            sale.Quantity = saleDto.Quantity;
            sale.UnitPrice = saleDto.UnitPrice;
            sale.Discount = saleDto.Discount;
            sale.UpdatedAt = DateTime.UtcNow;

            _context.Sales.Update(sale);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success", Id = sale.Id.ToString() });
        }

        [HttpDelete("{saleId}")]
        public async Task<IActionResult> DeletePSales(int saleId)
        {
            var sale = await _context.Sales.FirstOrDefaultAsync(c => c.Id == saleId);
            if (sale == null)
            {
                return BadRequest();
            }

            _context.Sales.Remove(sale);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success" });
        }
    }
}
