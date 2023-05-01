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
        public async Task<IActionResult> GetAllSells()
        {
            return Ok(await _sellRepository.GetAllSells());
        }

        [HttpGet]
        [Route("widget")]
        public async Task<IActionResult> SellsWidget()
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
            
            return Created("created", created);

        }

        [HttpGet]
        [Route("details/{id}")]
        public async Task<IActionResult> SellDetails(int id)
        {

            var sellInfo = await _sellRepository.GetSellInfo(id);
            var sellDetails = await _sellRepository.GetDetails(id);
            var response = sellInfo.FirstOrDefault();
            return Created("created", new { sell = sellInfo.FirstOrDefault(), details = sellDetails });

        }

    }
}

