using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PIA_PROG.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ValidationController : ControllerBase
    {
        [HttpGet]
        [Route("/")]
        public IActionResult validate()
        {
            return Ok("ok");
        }
    }

}
