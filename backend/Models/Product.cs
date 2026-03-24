namespace RetailOrdering.API.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int Stock { get; set; } // 🔥 important

        public int BrandId { get; set; }
    }
}
