using Microsoft.AspNetCore.Mvc;
using RetailOrdering.API.Data;

namespace RetailOrdering.API.Controllers
{
    [ApiController]
    [Route("api/categories/{categoryId}/brands")]
    public class BrandsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BrandsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetBrands(int categoryId)
        {
            var brands = _context.Brands
                .Where(b => b.CategoryId == categoryId)
                .ToList();

            return Ok(brands);
        }
    }
}
