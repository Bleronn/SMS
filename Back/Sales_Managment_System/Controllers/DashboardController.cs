using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sales_Managment_System.Common.Models.Dashboard;
using Sales_Managment_System.Persistence;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Sales_Managment_System.Controllers
{
    [Authorize]
    public class DashboardController : BaseController
    {
        private readonly DataContext _context;

        public DashboardController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboard()
        {
            var categoriesCount = await _context.Categories.CountAsync();
            var suppliersCount = await _context.Suppliers.CountAsync();
            var productsCount = await _context.Products.CountAsync();

            var sales = await _context.Sales.ToListAsync();
            var totalSales = sales.Count;
            var todaySales = sales.Where(s => s.InsertedAt.Day == DateTime.UtcNow.Day && s.InsertedAt.Month == DateTime.UtcNow.Month && s.InsertedAt.Year == DateTime.UtcNow.Year).ToList();
            var weekSales = sales.Where(s => s.InsertedAt >= DateTime.UtcNow - TimeSpan.FromDays(7 - (int) DateTime.UtcNow.DayOfWeek) && s.InsertedAt.Month == DateTime.UtcNow.Month && s.InsertedAt.Year == DateTime.UtcNow.Year).ToList();
            var todayStart = DateTime.UtcNow.Day;

            var result = new GetDashboardModel
            {
                CategoriesCount = categoriesCount,
                SuppliersCount = suppliersCount,
                ProductsCount = productsCount,
                TotalSales = totalSales,
                TodaySales = todaySales.Count,
                WeeklySales = weekSales.Count
            };

            return Ok(result);
        }
    }
}
