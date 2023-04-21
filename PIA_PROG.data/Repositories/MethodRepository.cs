using System;
using Dapper;
using MySql.Data.MySqlClient;
using PIA_PROG.model;

namespace PIA_PROG.data.Repositories
{
    public class MethodRepository : IMethodRepository
    {
        private readonly MySqlConfiguration _connectionString;

        public MethodRepository(MySqlConfiguration ConnectionString)
        {
            _connectionString = ConnectionString;
        }

        protected MySqlConnection dbConnection()
        {
            return new MySqlConnection(_connectionString.ConnectionString);
        }

        public async Task<bool> DeleteMethod(int id)
        {
            var db = dbConnection();

            var sql = @"CALL DELETE_METHOD(@idMethodP)";
            var result = await db.ExecuteAsync(sql, new { idMethodP = id });

            return result > 0;

        }

        public async Task<IEnumerable<Method>> GetAllMethods()
        {
            var db = dbConnection();

            var sql = @"CALL METHOD";
            return await db.QueryAsync<Method>(sql, new { });
        }

        public async Task<IEnumerable<Method>> InsertMethod(Method method)
        {
            var db = dbConnection();

            var sql = @"CALL INSERT_METHOD(@nameP)";
            return await db.QueryAsync<Method>(sql, new { nameP = method.Name});
        }

        public async Task<bool> UpdateMethod(int id, Method method)
        {
            var db = dbConnection();
            var sql = @"CALL UPDATE_METHOD(@idMethodP, @nameP, @statusP)";
            var result = await db.ExecuteAsync(sql, new { idMethodP = id, nameP = method.Name, statusP = method.Status });
            return result > 0;
        }
    }
}

