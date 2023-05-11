using System;
using Dapper;
using MySql.Data.MySqlClient;
using PIA_PROG.model;

namespace PIA_PROG.data.Repositories
{
	public class ReportRepository : IReportRepository
	{
        private readonly MySqlConfiguration _connectionString;

        public ReportRepository(MySqlConfiguration ConnectionString)
        {
            _connectionString = ConnectionString;
        }

        protected MySqlConnection dbConnection()
        {
            return new MySqlConnection(_connectionString.ConnectionString);
        }

      
        public async Task<IEnumerable<Monthly>> GetMonthlyReports(int month)
        {
            var db = dbConnection();

            var sql = @"CALL Monthly_Report(@month_p)";
            return await db.QueryAsync<Monthly>(sql, new { month_p = month });
        }

        public async Task<IEnumerable<ProductReport>> GetMonthlyProducReport(int month)
        {
            var db = dbConnection();

            var sql = @"CALL PRODUCT_REPORT(@month_p)";
            return await db.QueryAsync<ProductReport>(sql, new { month_p = month });
        }

        public async Task<IEnumerable<AnualReport>> GetAnualReport()
        {
            var db = dbConnection();
            var sql = @"CALL ANUAL_REPORT()";
            return await db.QueryAsync<AnualReport>(sql, new { });

        }
    }
}

