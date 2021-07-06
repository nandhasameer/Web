using ClientPortal.Web.Helpers;
using ClientPortal.Web.Services;
using Data.Helper;
using Data.Repositories;
using Data.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;

namespace ClientPortal.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IClientPortalUserService _userService;
        private readonly AppSettings _appSettings;
        public static readonly IClientPortalRepository _clientPortalRepository = new ClientPortalRestService();

        public UsersController(IClientPortalUserService userService, IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _appSettings = appSettings.Value;
        }

        #region Login Authentication
        [AllowAnonymous]
        [HttpGet("[action]")]
        // public IActionResult Authenticate([FromBody]User userParam)
        public IActionResult Authenticate(string UserId, string Password)
        {
            try
            {
                string Message = "";

                var appuser = _clientPortalRepository.UserLogin(UserId, Password);

                if (null != appuser)
                {
                    appuser = _userService.GenerateJwtToken(appuser);
                    return Ok(appuser);
                }

                if (appuser == null)
                {
                    Message = _userService.ErrorMessage();
                    return Ok(Message);
                }
                // return BadRequest(new { message = "Username or password is incorrect" });

                return null;
            }
            catch (Exception ex)
            {
                Utiltiy.WriteToFile(ex, "ERROR: ClientPortal - Authenticate.");

                //added
                //AppUser app = new AppUser();
                //app.Message = "UserId or Password not in a correct format";
                //List<MenuList> menuLists = new List<MenuList>();
                //var userData = new Tuple<AppUser, List<MenuList>>(app, menuLists);
                //return Ok(userData);
            }
            return null;
        }
        #endregion
    }
}