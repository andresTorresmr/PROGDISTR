using PIA_PROG.model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIA_PROG.data.Repositories
{
    public interface IBrandRepository
    {
        Task<IEnumerable<Brand>> GetAllBrands();
        Task<IEnumerable<Brand>> GetBrandDetails(int id);


        Task<IEnumerable<Brand>> InsertBrand(BrandIns brand);
        Task<bool> UpdateBrand(int id, Brand brand);
        Task<bool> DeleteBrand(int id);
    }
}
