using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PIA_PROG.data.Repositories;
using PIA_PROG.model;

namespace PIA_PROG.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class MethodController : ControllerBase  
    {
        private readonly IMethodRepository _methodRepository;

        public MethodController(IMethodRepository methodRepository)
        {
            _methodRepository = methodRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMethods()
        {
            return Ok(await _methodRepository.GetAllMethods());
        }

        [HttpPost]
        [Route("insert")]
        public async Task<IActionResult> CreateMethod([FromBody] Method method)
        {
            if (method == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _methodRepository.InsertMethod(method);
            return Created("created", created);


        }

        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> UpdateMethod(int id, [FromBody] Method method)
        {
            if (method == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _methodRepository.UpdateMethod(id, method);
            return Ok();

        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteMethod(int id)
        {
            await _methodRepository.DeleteMethod(id);
            return Ok();
        }


    }
}