using System;
using Dapper;
using MySql.Data.MySqlClient;
using PIA_PROG.model;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

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
         
            var sql =@"CALL INSERT_SELL(@dataP, @idMethodP, @totalP, @paysP, @changeP)";
            try
            {
                var accountSid = " ";
                var authToken = " ";
                TwilioClient.Init(accountSid, authToken);

                var messageOptions = new CreateMessageOptions(
                  new PhoneNumber("+528123564669"));
                messageOptions.From = new PhoneNumber("+12543213596");
                messageOptions.Body = "Registraste una venta por $"+sell.total.ToString();


                var message = MessageResource.Create(messageOptions);
                
                return await db.QueryAsync<Sell>(sql, new { dataP = sell.data, idMethodP = sell.idMethod, totalP = sell.total, paysP = sell.pays, changeP = sell.change });
            }
            catch
            {
                return await db.QueryAsync<Sell>(sql, new { dataP = sell.data, idMethodP = sell.idMethod, totalP = sell.total, paysP = sell.pays, changeP = sell.change });
            }
            
        }

        public async Task<IEnumerable<Sell>> GetAllSells()
        {
            var db = dbConnection();

            var sql = @"CALL SELLS_REPORT()";
            return await db.QueryAsync<Sell>(sql, new { });
        }

        public async Task<IEnumerable<sellData>> GetDetails(int id)
        {
            var db = dbConnection();

            var sql = @"CALL sell_data(@idP)";
            return await db.QueryAsync<sellData>(sql, new { idP = id });
        }

        public async Task<IEnumerable<SellInfo>> GetSellInfo(int id)
        {
            var db = dbConnection();

            var sql = @"CALL SELL_INFO(@idP)";
            return await db.QueryAsync<SellInfo>(sql, new { idP = id });
        }
    }
}

