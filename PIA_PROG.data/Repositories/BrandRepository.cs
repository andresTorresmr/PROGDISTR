using Dapper;
using MySql.Data.MySqlClient;
using PIA_PROG.model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIA_PROG.data.Repositories
{
    public class BrandRepository : IBrandRepository
    {
        private readonly MySqlConfiguration _connectionString;

        public BrandRepository(MySqlConfiguration ConnectionString)
        {
            _connectionString = ConnectionString;
        }

        protected MySqlConnection dbConnection()
        {
            return new MySqlConnection(_connectionString.ConnectionString);
        }
 
        public async Task<IEnumerable<Brand>> GetAllBrands()
        {
            var db = dbConnection();

            var sql = @"CALL BRANDS";
            return await db.QueryAsync<Brand>(sql, new { });
        }

        public async Task<IEnumerable<Brand>> GetBrandDetails(int id)
        {
            var db = dbConnection();

            var sql = @"CALL BRAND_DETAILS(@idBrand_P)";
            return await db.QueryAsync<Brand>(sql, new { idBrand_P = id });
        }

        public async Task<IEnumerable<Brand>> InsertBrand(BrandIns brand)
        {
            var db = dbConnection();
            
            var sql = @"CALL INSERT_BRAND(@name)";
            return await db.QueryAsync<Brand>(sql, new { brand.name });

            //var result = await db.ExecuteAsync(sql, new { brand.name});
            //return result > 0;
        }

        public async Task<bool> UpdateBrand(int id, Brand brand)
        {
            var db = dbConnection();
            var sql = @"CALL UPDATE_BRAND(@idBrand_p, @name_p, @status_p)";
            var result = await db.ExecuteAsync(sql, new { idBrand_p = id, name_p = brand.name, status_p = brand.status });
            return result > 0;
        }
        public async Task<bool> DeleteBrand(int id)
        {
            var db = dbConnection();

            var sql = @"CALL DELETE_BRAND(@idBrand)";
            var result = await db.ExecuteAsync(sql, new { idBrand = id });

            return result > 0;
        }

        
    }
}
