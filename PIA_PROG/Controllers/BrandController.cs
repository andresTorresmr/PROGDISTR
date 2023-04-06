using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PIA_PROG.data.Repositories;
using PIA_PROG.model;

namespace PIA_PROG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class BrandController : ControllerBase
    {
        private readonly IBrandRepository _brandRepository;

        public BrandController(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllBrands()
        {
            return Ok(await _brandRepository.GetAllBrands());
        }
        
        [HttpGet]
        [Route("details/{id}")] 
        public async Task<IActionResult> GetBrandDetails(int id)
        {
            var result = await _brandRepository.GetBrandDetails(id);
            Console.Write(result.Count());
            if (result.Count() < 1)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { error = "No se encontró la marca indicada" });
            }
            else
            {
                return Ok(result);
            }
        }

        [HttpPost]
        [Route("insert")]
        public async Task<IActionResult> CreatProduct([FromBody] BrandIns brand)
        {
            if (brand == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _brandRepository.InsertBrand(brand);
            return Created("created", created);


        }

        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] Brand brand)
        {
            if (brand == null )
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _brandRepository.UpdateBrand(id, brand);
            return Ok();

        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            await _brandRepository.DeleteBrand(id);
            return Ok();
        }
    }
}
    
