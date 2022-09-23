using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sales_Managment_System.Common.Entities;
using Sales_Managment_System.Common.Models;
using Sales_Managment_System.Common.Models.ProductUnit;
using Sales_Managment_System.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales_Managment_System.Controllers
{
    [Authorize]
    public class ProductUnitController : BaseController
    {
        private readonly DataContext _context;

        public ProductUnitController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProductUnits()
        {
            return Ok(await _context.ProductUnit.ToListAsync());
        }

        [HttpGet("{productUnitId}")]
        public async Task<IActionResult> GetProductUnit(int productUnitId)
        {
            var productUnit = await _context.ProductUnit.FirstOrDefaultAsync(s => s.Id == productUnitId);
            if (productUnit == null)
            {
                return BadRequest();
            }

            return Ok(productUnit);
        }

        [HttpPost]
        public async Task<IActionResult> InsertProductUnit([FromBody] InsertProductUnitDto productUnitDto)
        {
            var productUnit = new ProductUnit
            {

                ProductId = productUnitDto.ProductId,               
                
                InsertedAt = DateTime.UtcNow,
            };

            _context.ProductUnit.Add(productUnit);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success", Id = productUnit.Id.ToString() });
        }

        [HttpPut("{productUnitId}")]
        public async Task<IActionResult> EditProductUnit(int productUnitId, [FromBody] InsertProductUnitDto productUnitDto)
        {
            var productUnit = await _context.ProductUnit.FirstOrDefaultAsync(s => s.Id == productUnitId);
            if (productUnit == null)
            {
                return BadRequest();
            }

            productUnit.ProductId = productUnitDto.ProductId;           
          
            productUnit.UpdatedAt = DateTime.UtcNow;

            _context.ProductUnit.Update(productUnit);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success", Id = productUnit.Id.ToString() });
        }

        [HttpDelete("{productUnitId}")]
        public async Task<IActionResult> DeletePProductUnits(int productUnitId)
        {
            var productUnit = await _context.ProductUnit.FirstOrDefaultAsync(c => c.Id == productUnitId);
            if (productUnit == null)
            {
                return BadRequest();
            }

            _context.ProductUnit.Remove(productUnit);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success" });
        }
    }
}
