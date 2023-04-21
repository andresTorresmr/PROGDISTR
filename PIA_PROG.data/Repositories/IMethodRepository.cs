using System;
using PIA_PROG.model;

namespace PIA_PROG.data.Repositories
{
	public interface IMethodRepository
	{
		Task<IEnumerable<Method>> GetAllMethods();
        Task<IEnumerable<Method>> InsertMethod(Method method );
        Task<bool> UpdateMethod(int id, Method method);
        Task<bool> DeleteMethod(int id);
    }
}

