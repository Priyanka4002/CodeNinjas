using RetailOrdering.API.Data;
using RetailOrdering.API.Models;
using Microsoft.EntityFrameworkCore;

namespace RetailOrdering.API.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetProductsByBrandId(int brandId)
        {
            return await _context.Products
                .Where(p => p.BrandId == brandId)
                .ToListAsync();
        }
    }
}
