using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sales_Managment_System.Common.Entities;
using Sales_Managment_System.Common.Models;
using Sales_Managment_System.Common.Models.Customer;
using Sales_Managment_System.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales_Managment_System.Controllers
{
    [Authorize]
    public class CustomerController : BaseController
    {
        private readonly DataContext _context;

        public CustomerController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {
            return Ok(await _context.Customers.ToListAsync());
        }

        [HttpGet("{customerId}")]
        public async Task<IActionResult> GetCustomer(string customerId)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Id == customerId);
            if (customer == null)
            {
                return BadRequest();
            }

            return Ok(customer);
        }

        [HttpPost]
        public async Task<IActionResult> InsertCustomer([FromBody] InsertCustomerDto customerDto)
        {
            var customer = new Customer
            {
                Id = Guid.NewGuid().ToString(),
                FirstName = customerDto.FirstName,
                LastName = customerDto.LastName,
                Contact = customerDto.Contact,
                Address = customerDto.Address,
                InsertedAt = DateTime.UtcNow,
            };

            _context.Customers.Add(customer);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success", Id = customer.Id.ToString() });
        }

        [HttpPut("{customerId}")]
        public async Task<IActionResult> EditCustomer(string customerId, [FromBody] InsertCustomerDto customerDto)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Id == customerId);
            if (customer == null)
            {
                return BadRequest();
            }

            customer.FirstName = customerDto.FirstName;
            customer.LastName = customerDto.LastName;
            customer.Contact = customerDto.Contact;
            customer.Address = customerDto.Address;
            customer.UpdatedAt = DateTime.UtcNow;

            _context.Customers.Update(customer);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success", Id = customer.Id.ToString() });
        }

        [HttpDelete("{customerId}")]
        public async Task<IActionResult> DeletePCategory(string customerId)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Id == customerId);
            if (customer == null)
            {
                return BadRequest();
            }

            _context.Customers.Remove(customer);

            await _context.SaveChangesAsync();

            return Ok(new Response { Status = "Success" });
        }
    }
}
