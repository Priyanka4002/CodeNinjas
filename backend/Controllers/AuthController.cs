using Microsoft.AspNetCore.Mvc;
using RetailOrdering.API.DTOs;

namespace RetailOrdering.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            var user = _authService.Register(dto);
            return Ok(user);
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _authService.ValidateUser(dto);

            if (user == null)
                return Unauthorized("Invalid credentials");

            var token = _authService.GenerateToken(user);

            return Ok(new { token });
        }
    }
}
