using System;
using PIA_PROG.model;

namespace PIA_PROG.data.Repositories
{
	public interface ISellRepository
	{
		Task<IEnumerable<Sell>> GetSells();
        Task<IEnumerable<Sell>> GetAllSells();
        Task<IEnumerable<sellData>> GetDetails(int id);
        Task<IEnumerable<SellInfo>> GetSellInfo(int id);
        Task<IEnumerable<Sell>> InsertSell(SellIns sell);


    }
}

