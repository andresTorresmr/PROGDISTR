using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PIA_PROG.data.Repositories;
using PIA_PROG.model;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;


namespace PIA_PROG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly string secretkey;
        private readonly string connection;

        public AuthController(IConfiguration config)
        {
            secretkey = config.GetSection("settings").GetSection("secretkey").ToString();
            connection = config.GetConnectionString("MySqlConnection");
        }


        [HttpPost]
        [Route("login")]
        public IActionResult validate([FromBody] login request)
        {
            List<string> validationList = AuthRepository.getToken(connection, request);

            if (validationList[0] == "00")
            {
                var keyBytes = Encoding.ASCII.GetBytes(secretkey);
                var claims = new ClaimsIdentity();

                claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, request.user));

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = claims,
                    Expires = DateTime.UtcNow.AddMinutes(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256Signature),

                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenConfig = tokenHandler.CreateToken(tokenDescriptor);

                string createdToken = tokenHandler.WriteToken(tokenConfig);
                try
                {
                    var accountSid = " ";
                    var authToken = " ";
                    TwilioClient.Init(accountSid, authToken);

                    var messageOptions = new CreateMessageOptions(
                      new PhoneNumber("+528123564669"));
                    messageOptions.From = new PhoneNumber("+12543213596");
                    messageOptions.Body = "Iniciaste sesión con tu cuenta";


                    var message = MessageResource.Create(messageOptions);

                    return StatusCode(StatusCodes.Status200OK, new { access_token = createdToken });
                }
                catch
                {
                    return StatusCode(StatusCodes.Status200OK, new { access_token = createdToken });
                }
                
            }
            else
            {
                return StatusCode(StatusCodes.Status401Unauthorized, new { access_token = "" });
            }
               
        }

    }
}
