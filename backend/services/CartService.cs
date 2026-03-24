using RetailOrdering.API.Data;
using RetailOrdering.API.DTOs;
using RetailOrdering.API.Models;
using System.Security.Claims;

public class CartService
{
    private readonly AppDbContext _context;
    private readonly IHttpContextAccessor _http;

    public CartService(AppDbContext context, IHttpContextAccessor http)
    {
        _context = context;
        _http = http;
    }

    private int GetUserId()
    {
        var userId = _http.HttpContext.User
            .FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userId))
            throw new Exception("User not authenticated properly");

        return int.Parse(userId);
    }

    public Cart GetUserCart()
    {
        var userId = GetUserId();

        var cart = _context.Carts
            .FirstOrDefault(c => c.UserId == userId);

        if (cart == null)
        {
            cart = new Cart
            {
                UserId = userId,
                Items = new List<CartItem>()
            };

            _context.Carts.Add(cart);
            _context.SaveChanges();
        }

        return cart;
    }

    public void AddToCart(AddToCartDto dto)
    {
        var cart = GetUserCart();

        var existing = _context.CartItems
            .FirstOrDefault(x => x.CartId == cart.Id && x.ProductId == dto.ProductId);

        if (existing != null)
        {
            existing.Quantity += dto.Quantity;
        }
        else
        {
            _context.CartItems.Add(new CartItem
            {
                CartId = cart.Id,
                ProductId = dto.ProductId,
                Quantity = dto.Quantity
            });
        }

        _context.SaveChanges();
    }

    public List<CartItem> GetCartItems()
    {
        var cart = GetUserCart();

        return _context.CartItems
            .Where(x => x.CartId == cart.Id)
            .ToList();
    }

    public void UpdateQuantity(int productId, int quantity)
    {
        var cart = GetUserCart();

        var item = _context.CartItems
            .FirstOrDefault(x => x.CartId == cart.Id && x.ProductId == productId);

        if (item == null)
            throw new Exception("Item not found");

        item.Quantity = quantity;

        _context.SaveChanges();
    }

    public void RemoveItem(int productId)
    {
        var cart = GetUserCart();

        var item = _context.CartItems
            .FirstOrDefault(x => x.CartId == cart.Id && x.ProductId == productId);

        if (item == null)
            throw new Exception("Item not found");

        _context.CartItems.Remove(item);
        _context.SaveChanges();
    }

    public void ClearCart()
    {
        var cart = GetUserCart();

        var items = _context.CartItems
            .Where(x => x.CartId == cart.Id);

        _context.CartItems.RemoveRange(items);
        _context.SaveChanges();
    }
}