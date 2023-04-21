using System;
using Microsoft.AspNetCore.Mvc;
using PIA_PROG.data.Repositories;
using PIA_PROG.model;

namespace PIA_PROG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellController : ControllerBase
	{
        private readonly ISellRepository _sellRepository;

        public SellController(ISellRepository sellRepository)
        {
            _sellRepository = sellRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetSells()
        {
            return Ok(await _sellRepository.GetSells());
        }

        [HttpPost]
        [Route("insert")]
        public async Task<IActionResult> InsertSell([FromBody] SellIns sell)
        {
            if (sell== null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _sellRepository.InsertSell(sell);
            System.Diagnostics.Debug.WriteLine(created);
            return Created("created", created);

        }
    }
}

