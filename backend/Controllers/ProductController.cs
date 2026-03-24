using Microsoft.AspNetCore.Mvc;
using RetailOrdering.API.Services;

namespace RetailOrdering.API.Controllers
{
    [ApiController]
    [Route("brands/{brandId}/products")]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _service;

        public ProductController(ProductService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts(int brandId)
        {
            var products = await _service.GetProducts(brandId);
            return Ok(products);
        }
    }
}
