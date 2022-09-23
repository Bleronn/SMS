using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sales_Managment_System.Common.Entities;
using Sales_Managment_System.Common.Models;
using Sales_Managment_System.Common.Models.Products;
using Sales_Managment_System.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales_Managment_System.Controllers
{
    [Authorize]
    public class ProductController : BaseController
    {
        private readonly DataContext _context;

        public ProductController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            return Ok(await _context.Products.Include(p => p.Category).ToListAsync());
        }

        [HttpGet("{productId}")]
        public async Task<IActionResult> GetProduct(int productId)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == productId);
            if (product == null)
            {
                return BadRequest();
            }

            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> InsertProduct([FromBody] InsertProductDto productDto)
        {
            var product = new Product
            {
                Name = productDto.Name,
                CategoryId = productDto.CategoryId,
                
                UnitsInStock = productDto.UnitsInStock,
                Price = productDto.Price,
                Discount = productDto.Discount,
                InsertedAt = DateTime.UtcNow,
            };

            _context.Products.Add(product);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success", Id = product.Id.ToString() });
        }

        [HttpPut("{productId}")]
        public async Task<IActionResult> EditProduct(int productId, [FromBody] InsertProductDto productDto)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == productId);
            if(product == null)
            {
                return BadRequest();
            }

            product.Name = productDto.Name;
            product.CategoryId = productDto.CategoryId;
           
            product.UnitsInStock = productDto.UnitsInStock;
            product.Price = productDto.Price;
            product.Discount = productDto.Discount;
            product.UpdatedAt = DateTime.UtcNow;

            _context.Products.Update(product);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success", Id = product.Id.ToString() });
        }

        [HttpDelete("{productId}")]
        public async Task<IActionResult> DeleteProduct(int productId)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == productId);
            if (product == null)
            {
                return BadRequest();
            }

            _context.Products.Remove(product);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success" });
        }

    }
}
