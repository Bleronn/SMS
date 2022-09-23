namespace Sales_Managment_System.Common.Models.Dashboard
{
    public class GetDashboardModel
    {
        public int CategoriesCount { get; set; }
        public int SuppliersCount { get; set; }
        public int ProductsCount { get; set; }
        public int TotalSales { get; set; }
        public int TodaySales { get; set; }
        public int WeeklySales { get; set; }
    }
}
