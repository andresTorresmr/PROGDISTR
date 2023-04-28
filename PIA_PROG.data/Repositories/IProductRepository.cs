using System;
using PIA_PROG.model;

namespace PIA_PROG.data.Repositories
{
	public interface IProductRepository
	{
		Task<IEnumerable<Product>> GetAllProducts();
        Task<IEnumerable<Product>> GetDetails(int id);
        Task<IEnumerable<Product>> InsertProduct(ProductIns product);

        Task<bool> UpdateProduct(int id, Product product);
        Task<bool> DeleteProduct(int id);
    }
}

    