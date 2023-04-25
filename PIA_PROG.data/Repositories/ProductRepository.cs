using System;
using Dapper;
using MySql.Data.MySqlClient;
using PIA_PROG.model;

namespace PIA_PROG.data.Repositories
{
	public class ProductRepository : IProductRepository
	{
        private readonly MySqlConfiguration _connectionString;

        public ProductRepository(MySqlConfiguration ConnectionString)
        {
            _connectionString = ConnectionString;
        }

        protected MySqlConnection dbConnection()
        {
            return new MySqlConnection(_connectionString.ConnectionString);
        }
         
        public async Task<bool> DeleteProduct(int id)
        {
            var db = dbConnection();

            var sql = @"CALL DELETE_PRODUCT(@idProduct_P)";
            var result =  await db.ExecuteAsync(sql, new { idProduct_P = id });

            return result > 0;

        }

        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            var db = dbConnection();

            var sql = @"CALL PRODUCTS";
            return await db.QueryAsync<Product>(sql, new { });
        }

        public async Task<IEnumerable<Product>> GetDetails(int id)
        {
            var db = dbConnection();
            var sql = @"CALL PRODUCT_DETAILS(@idProduct)";
            
            return await db.QueryAsync<Product>(sql, new { idProduct = id });
            
        }

        public async Task<IEnumerable<Product>> InsertProduct(ProductIns product)
        {
            var db = dbConnection();

            var sql = @"CALL INSERT_PRODUCT(@name, @idbrand, @stock, @unitPrice)";
            return await db.QueryAsync<Product>(sql, new {product.Name, product.IdBrand, product.Stock, product.UnitPrice });
            
        }

        public async Task<bool> UpdateProduct(int id, Product product)  
        {
            var db = dbConnection();
            var sql = @"CALL UPDATE_PRODUCT(@idProduct_P, @name, @idbrand, @stock, @unitPrice, @status)";
            var result = await db.ExecuteAsync(sql, new {idProduct_P = id, product.Name, product.IdBrand, product.Stock, product.UnitPrice, product.Status });
            return result > 0;
        }

        public async Task<IEnumerable<Monthly_P>> GetMonth(int id)
        {
            var db = dbConnection();
            var sql = @"CALL MONTHLY_REPORT(@Monthly_Report)";

            return await db.QueryAsync<Monthly_P>(sql, new { Monthly_Report = id });
        }
    }
}

