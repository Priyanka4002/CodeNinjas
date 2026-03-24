namespace RetailOrdering.API.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }

        public List<OrderItem> Items { get; set; }
    }
}
