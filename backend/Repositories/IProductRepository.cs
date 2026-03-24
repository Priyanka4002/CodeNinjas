using RetailOrdering.API.Models;

namespace RetailOrdering.API.Repositories
{
    public interface IProductRepository
    {
        Task<List<Product>> GetProductsByBrandId(int brandId);
    }
}
