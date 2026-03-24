using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RetailOrdering.API.DTOs;

[ApiController]
[Route("api/cart")]
[Authorize]
public class CartController : ControllerBase
{
    private readonly CartService _service;

    public CartController(CartService service)
    {
        _service = service;
    }

    // ✅ Add to cart
    [HttpPost]
    public IActionResult AddToCart(AddToCartDto dto)
    {
        _service.AddToCart(dto);
        return Ok("Added to cart ✅");
    }

    // ✅ Get cart items
    [HttpGet]
    public IActionResult GetCart()
    {
        var items = _service.GetCartItems();
        return Ok(items);
    }

    // ✅ Update quantity
    [HttpPut]
    public IActionResult UpdateQuantity(int productId, int quantity)
    {
        _service.UpdateQuantity(productId, quantity);
        return Ok("Updated ✅");
    }

    // ✅ Remove item
    [HttpDelete("{productId}")]
    public IActionResult RemoveItem(int productId)
    {
        _service.RemoveItem(productId);
        return Ok("Removed ✅");
    }
}