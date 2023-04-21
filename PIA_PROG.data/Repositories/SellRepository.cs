using System;
using Dapper;
using MySql.Data.MySqlClient;
using PIA_PROG.model;

namespace PIA_PROG.data.Repositories
{
	public class SellRepository : ISellRepository
	{


        private readonly MySqlConfiguration _connectionString;

        public SellRepository(MySqlConfiguration ConnectionString)
        {
            _connectionString = ConnectionString;
        }

        protected MySqlConnection dbConnection()
        {
            return new MySqlConnection(_connectionString.ConnectionString);
        }

        public async Task<IEnumerable<Sell>> GetDetails()
        {
            var db = dbConnection();

            var sql = @"CALL PRODUCTS";
            return await db.QueryAsync<Sell>(sql, new { });
        }

        public async Task<IEnumerable<Sell>> GetSells()
        {
            var db = dbConnection();

            var sql = @"CALL SELLS";
            return await db.QueryAsync<Sell>(sql, new { });
        }

        public async Task<IEnumerable<Sell>> InsertSell(SellIns sell)
        {
            var db = dbConnection();
         
            var sql =@"CALL INSERT_SELL(@dataP, @idMethodP, @totalP)";
            return await db.QueryAsync<Sell>(sql, new { dataP = sell.data, idMethodP = sell.idMethod, totalP = sell.total });
            

            

        }
    }
}

