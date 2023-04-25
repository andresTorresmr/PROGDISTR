using System;
namespace PIA_PROG.model
{
	public class Product
	{
		public int IdProduct { get; set; }
		public string Name { get; set; }
        public int IdBrand { get; set; }
        public string Brand { get; set; }
        public int Stock { get; set; }
        public double UnitPrice { get; set; }
        public int Status { get; set; }
    }

    public class ProductIns
    {
        public string Name { get; set; }
        public int IdBrand { get; set; }
        public int Stock { get; set; }
        public double UnitPrice { get; set; }
    }
    public class Monthly_P
    {
        int day { get; set; }
        int total { get; set; }
    }
}

