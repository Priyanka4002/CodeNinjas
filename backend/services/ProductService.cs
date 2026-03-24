using RetailOrdering.API.Models;
using RetailOrdering.API.Repositories;

namespace RetailOrdering.API.Services
{
    public class ProductService
    {
        private readonly IProductRepository _repo;

        public ProductService(IProductRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<Product>> GetProducts(int brandId)
        {
            return await _repo.GetProductsByBrandId(brandId);
        }
    }
}
