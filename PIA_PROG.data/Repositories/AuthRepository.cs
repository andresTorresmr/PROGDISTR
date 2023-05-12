using System;
using PIA_PROG.model;

namespace PIA_PROG.data.Repositories
{
	public class AuthRepository
	{
		public static List<string> getToken(string P_connection, login user)
		{
			List<string> validationList = new List<string>();
			if(user.user == "admin" && user.password == "admin")
			{
				validationList.Add("00");
			}
			else
			{
				validationList.Add("14");
			}

			return validationList;
		}
	}
}

