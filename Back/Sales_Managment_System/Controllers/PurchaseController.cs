using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sales_Managment_System.Common.Entities;
using Sales_Managment_System.Common.Models;
using Sales_Managment_System.Common.Models.Purchase;
using Sales_Managment_System.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales_Managment_System.Controllers
{
    [Authorize]
    public class PurchaseController : BaseController
    {
        private readonly DataContext _context;

        public PurchaseController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPurchases()
        {
            return Ok(await _context.Purchases.ToListAsync());
        }

        [HttpGet("{purchaseId}")]
        public async Task<IActionResult> GetPurchase(int purchaseId)
        {
            var purchase = await _context.Purchases.FirstOrDefaultAsync(s => s.Id == purchaseId);
            if (purchase == null)
            {
                return BadRequest();
            }

            return Ok(purchase);
        }

        [HttpPost]
        public async Task<IActionResult> InsertPurchase([FromBody] InsertPurchaseDto purchaseDto)
        {
            var purchase = new Purchase
            {

                InvoiceId = purchaseDto.InvoiceId,               
                Quantity = purchaseDto.Quantity,
                SupplierId = purchaseDto.SupplierId,
                UnitPrice = purchaseDto.UnitPrice,
                Discount = purchaseDto.Discount,
                InsertedAt = DateTime.UtcNow,
            };

            _context.Purchases.Add(purchase);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success", Id = purchase.Id.ToString() });
        }

        [HttpPut("{purchaseId}")]
        public async Task<IActionResult> EditPurchase(int purchaseId, [FromBody] InsertPurchaseDto purchaseDto)
        {
            var purchase = await _context.Purchases.FirstOrDefaultAsync(s => s.Id == purchaseId);
            if (purchase == null)
            {
                return BadRequest();
            }

            purchase.InvoiceId = purchaseDto.InvoiceId;           
            purchase.Quantity = purchaseDto.Quantity;
            purchase.SupplierId = purchaseDto.SupplierId;
            purchase.UnitPrice = purchaseDto.UnitPrice;
            purchase.Discount = purchaseDto.Discount;
            purchase.UpdatedAt = DateTime.UtcNow;

            _context.Purchases.Update(purchase);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success", Id = purchase.Id.ToString() });
        }

        [HttpDelete("{purchaseId}")]
        public async Task<IActionResult> DeletePPurchases(int purchaseId)
        {
            var purchase = await _context.Purchases.FirstOrDefaultAsync(c => c.Id == purchaseId);
            if (purchase == null)
            {
                return BadRequest();
            }

            _context.Purchases.Remove(purchase);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success" });
        }
    }
}
