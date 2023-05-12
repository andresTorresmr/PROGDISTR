using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySqlX.XDevAPI.Common;
using PIA_PROG.data.Repositories;
using PIA_PROG.model;

namespace PIA_PROG.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            

            return Ok(await _productRepository.GetAllProducts());
        }

        [HttpGet]
        [Route("details/{id}")]
        public async Task<IActionResult> GetDetails(int id)
        {
            var result = await _productRepository.GetDetails(id);
            Console.Write(result.Count());
            if(result.Count() < 1)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { error = "No se encontró el producto indicado" });
            }
            else
            {
                return Ok(result);
            }
            
        }

        [HttpPost]
        [Route("insert")]
        public async Task<IActionResult> CreatProduct([FromBody] ProductIns product)
        {
            if (product == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _productRepository.InsertProduct( product);
            return Created("created", created);


        }

        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product product)
        {
            if (product == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _productRepository.UpdateProduct(id, product);
            return Ok();

        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            await _productRepository.DeleteProduct(id);
            return Ok();
        }
    }
}