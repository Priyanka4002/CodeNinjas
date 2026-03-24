using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RetailOrdering.API.Services;
using System.Security.Claims;

namespace RetailOrdering.API.Controllers
{
    [ApiController]
    [Route("api/orders")]
    [Authorize] // 🔐 user must be logged in
    public class OrdersController : ControllerBase
    {
        private readonly OrderService _service;

        public OrdersController(OrderService service)
        {
            _service = service;
        }

        // 🔥 Place order from cart (no DTO needed)
        [HttpPost]
        public IActionResult PlaceOrder()
        {
            // Get logged-in user ID from JWT token
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized("User ID not found in token");

            int userId = int.Parse(userIdClaim.Value);

            // Call service
            _service.PlaceOrderFromCart(userId);

            return Ok("Order placed from cart ✅");
        }
    }
}