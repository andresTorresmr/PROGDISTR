using System;
namespace PIA_PROG.data
{
	public class MySqlConfiguration
	{
		public MySqlConfiguration(string connectionString)
		{
			ConnectionString = connectionString;
		}

		public string ConnectionString { get; set; }
	}
}

