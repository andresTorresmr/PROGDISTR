using System;
using PIA_PROG.model;

namespace PIA_PROG.data.Repositories
{
	public interface IReportRepository
	{
		Task<IEnumerable<Monthly>> GetMonthlyReports(int month);
	}
}

