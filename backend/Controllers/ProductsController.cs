namespace RetailOrdering.API.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using RetailOrdering.API.Data;

    [ApiController]
    [Route("api/brands/{brandId}/products")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Get products by brand
        [HttpGet]
        public IActionResult GetProducts(int brandId)
        {
            var products = _context.Products
                .Where(p => p.BrandId == brandId)
                .ToList();

            return Ok(products);
        }
    }
}
