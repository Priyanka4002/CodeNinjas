using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RetailOrdering.API.Data;
using RetailOrdering.API.DTOs;
using RetailOrdering.API.Models;

[ApiController]
[Route("api/admin")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly AppDbContext _context;

    public AdminController(AppDbContext context)
    {
        _context = context;
    }

    // ✅ 1. Add Category
    [HttpPost("categories")]
    public IActionResult AddCategory(CategoryDto dto)
    {
        var category = new Category
        {
            Name = dto.Name
        };

        _context.Categories.Add(category);
        _context.SaveChanges();

        return Ok(category);
    }

    // ✅ 2. Add Brand
    [HttpPost("brands")]
    public IActionResult AddBrand(BrandDto dto)
    {
        var brand = new Brand
        {
            Name = dto.Name,
            CategoryId = dto.CategoryId
        };

        _context.Brands.Add(brand);
        _context.SaveChanges();

        return Ok(brand);
    }

    // ✅ 3. Add Product
    [HttpPost("products")]
    public IActionResult AddProduct(ProductDto dto)
    {
        var product = new Product
        {
            Name = dto.Name,
            Stock = dto.Stock,
            BrandId = dto.BrandId
        };

        _context.Products.Add(product);
        _context.SaveChanges();

        return Ok(product);
    }

    // ✅ 4. Update Inventory
    [HttpPut("inventory")]
    public IActionResult UpdateStock(UpdateStockDto dto)
    {
        var product = _context.Products.Find(dto.ProductId);

        if (product == null)
            return NotFound("Product not found");

        product.Stock = dto.Stock;

        _context.SaveChanges();

        return Ok(product);
    }
}