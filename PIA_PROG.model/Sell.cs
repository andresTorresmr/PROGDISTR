using System;
namespace PIA_PROG.model
{
	public class Sell
	{
		public int idSell { get; set; }
        public int idMethod { get; set; }
        public string? name { get; set; }
        public double total { get; set; }
        public DateTime dateCreated { get; set; }
    }


    public class SellIns
    {
        public string? data { get; set;  }
        public int idMethod { get; set; }
        public double total { get; set; }
        public double pays { get; set; }
        public double change { get; set; }
    }
    public class SellInfo
    {
        public int idSell { get; set; }
        public string? name { get; set; }
        public double total { get; set; }
        public double pays { get; set; }
        public double change { get; set; }
        public DateTime dateCreated { get; set; }
    }
    public class sellData
    {
        public string?  product { get; set; }
        public string? brand { get; set; }
        public int quantity { get; set; }
        public double sellPrice { get; set; }
    }

}

