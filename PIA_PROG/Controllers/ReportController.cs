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
    public class ReportController : ControllerBase
    {
        private readonly IReportRepository _reportRepository;

        public ReportController(IReportRepository reportRepository)
        {
            _reportRepository = reportRepository;
        }

        [HttpGet]
        [Route("monthly/{month}")]
        public async Task<IActionResult> GetSells(int month)
        {
            var result = await _reportRepository.GetMonthlyReports(month);
            Console.Write(result.Count());
            if (result.Count() < 1)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { error = "No se encontró el reporte indicado" });
            }
            else
            {
                return Ok(result);
            }
        }

    }
}