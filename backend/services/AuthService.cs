using Microsoft.IdentityModel.Tokens;
using RetailOrdering.API.Data;
using RetailOrdering.API.DTOs;
using RetailOrdering.API.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

public class AuthService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public AuthService(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    public string GenerateToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddHours(2),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public User Register(RegisterDto dto)
    {
        var user = new User
        {
            Username = dto.Username,
            Password = dto.Password,
            Role = "User" // FORCE USER ONLY
        };

        _context.Users.Add(user);
        _context.SaveChanges();

        return user;
    }

    public User ValidateUser(LoginDto dto)
    {
        return _context.Users
            .FirstOrDefault(x =>
                x.Username == dto.Username &&
                x.Password == dto.Password);
    }
}