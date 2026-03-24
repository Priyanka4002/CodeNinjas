using Microsoft.EntityFrameworkCore;
using RetailOrdering.API.Data;
using RetailOrdering.API.Models;

namespace RetailOrdering.API.Services
{
    public class OrderService
    {
        private readonly AppDbContext _context;

        public OrderService(AppDbContext context)
        {
            _context = context;
        }

        // 🔥 Place order using Cart
        public void PlaceOrderFromCart(int userId)
        {
            // Get cart with items
            var cart = _context.Carts
                .Include(c => c.Items)
                .FirstOrDefault(c => c.UserId == userId);

            // Validate cart
            if (cart == null || !cart.Items.Any())
                throw new Exception("Cart is empty");

            // Validate stock and reduce it
            foreach (var item in cart.Items)
            {
                var product = _context.Products.Find(item.ProductId);

                if (product == null)
                    throw new Exception($"Product {item.ProductId} not found");

                if (product.Stock < item.Quantity)
                    throw new Exception($"Not enough stock for {product.Name}");

                product.Stock -= item.Quantity;
            }

            // Create order
            var order = new Order
            {
                CreatedAt = DateTime.Now,
                Items = cart.Items.Select(x => new OrderItem
                {
                    ProductId = x.ProductId,
                    Quantity = x.Quantity
                }).ToList()
            };

            // Save order
            _context.Orders.Add(order);

            // 🔥 Clear cart items
            _context.CartItems.RemoveRange(cart.Items);

            // Save all changes
            _context.SaveChanges();
        }
    }
}