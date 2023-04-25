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

    }
}

