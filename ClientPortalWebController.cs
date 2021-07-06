/// <summary>
/// Copyright YsecIT India -2019.
/// Author Sameer😍
/// </summary>
/// 


namespace ClientPortal.Web.Controllers
{
    using ClientPortal.Web.Helpers;
    using ClientPortalAPI.Modles;
    using Data.Core;
    using Data.Helper;
    using Data.Models;
    using Data.Repositories;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Text;

    [Route("api/[controller]")]
    [ApiController]
    public class ClientPortalWebController : ControllerBase
    {
        private readonly ClientPortalRestService _clientPortalRepository = new ClientPortalRestService();
        private readonly string FileUploadApiUrl = ApiUrlConstants.FileManagementApiUrl;
        private readonly AppSettings _appSettings;
        public ClientPortalWebController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        #region ConfigurationData
        [Authorize]
        [HttpGet("[action]")]
        public JsonResult ConfigurationData()
        {

            Dictionary<string, object> param = new Dictionary<string, object>();
            param["ClientId"] = _appSettings.ClientId;
            param["CurrencyID"] = _appSettings.CurrencyID;
            param["AddGameInfoUploadUrl"] = _appSettings.ClientPortalAddGameInfoUploadUrl;
            param["UploadedResourceFilesUrl"] = _appSettings.UploadedResourceFilesUrl;
            param["ZipTempPath"] = _appSettings.zipTempPath;
            return new JsonResult(param);

        }
        #endregion

        #region GetGameInfo
        [Authorize]
        [HttpPost("[Action]")]
        public List<SlotGamesGameInfo> GetGameInfo(int GameID)
        {
            try
            {
                if (_appSettings.ClientId >= 0 && GameID >= 0 && _appSettings.LanguageId >= 0)
                {
                    List<SlotGamesGameInfo> result = _clientPortalRepository.GetGameInfo(GameID, _appSettings.ClientId, _appSettings.LanguageId);
                    return result;
                }
                else
                {
                    return null;
                }

            }
            catch (Exception ex)
            {
                Utiltiy.WriteToFile(ex, "ERROR: ClientPortal - GetGameInfo.");
                return null;
            }


        }
        #endregion

        #region GetTryNow
        [Authorize]
        [HttpGet("[Action]")]
        public JsonResult GetTryNow(int GameID, int ClientId)
        {
            try
            {
                if (ClientId >= 0 && GameID >= 0)
                {
                    var result = _clientPortalRepository.GetTryNowData(GameID, ClientId);
                    return new JsonResult(result);
                }
                else
                {

                    return new JsonResult(NotFound());
                }

            }

            catch (Exception ex)
            {
                Utiltiy.WriteToFile(ex, "ERROR: ClientPortal - GetTryNow.");
                return new JsonResult(NotFound());
            }
        }
        #endregion

        #region GetGameDetailsByCategory
        // GET: api/ClientProtal/GetGameDetailsBycategory?CatagoryId={0}   
        [Authorize]
        [HttpGet("[Action]")]
        public JsonResult GetGameDetailsByCategory(int CategeoryId)
        {
            try
            {
                if (CategeoryId >= 0)
                {
                    List<GameDetails> result = _clientPortalRepository.GetGameDetailsByCategory(CategeoryId);
                    return new JsonResult(result);
                }
                else
                {
                    return new JsonResult(NotFound());
                }
            }
            catch (Exception ex)
            {
                //TODO: Write ❌ErrorLog Here!
                Utiltiy.WriteToFile(ex, "ERROR: ClientPortal - GetGameDetailsByCategory.");
                return new JsonResult(NotFound());
            }
        }
        #endregion

        #region GetGameCategory
        [Authorize]
        [HttpGet("[Action]")]
        public IEnumerable<Category> GetGameCategory()
        {
            try
            {
                var result = _clientPortalRepository.GetGameCategory();
                if (null != result)
                {
                    return result;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                //TODO: Write ❌ErrorLog Here!
                Utiltiy.WriteToFile(ex, "ERROR: ClientPortal - GetGameCategory.");
                return null;
            }
        }
        #endregion

        #region GetNewsandEvents
        [Authorize]
        [HttpGet("[Action]")]
        public IEnumerable<News_Event> GetNewsandEvents()
        {
            try
            {
                var result = _clientPortalRepository.GetNewsAndEvents();
                if (null != result)
                {
                    return result;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                //TODO: Write ❌ErrorLog Here!
                Utiltiy.WriteToFile(ex, "ERROR: ClientPortal - GetNewsandEvents.");
                return null;
            }
        }
        #endregion

        #region GetGameResourceDetails
        [Authorize]
        [HttpGet("[Action]")]
        public JsonResult GetGameResourceDetails(int GameId)
        {
            try
            {
                if (GameId >= 0)
                {
                    var result = _clientPortalRepository.GetGameResourceDetails(GameId);
                    return new JsonResult(result);
                }
                else
                {
                    return new JsonResult(NotFound());
                }
            }
            catch (Exception ex)
            {
                //TODO: Write ❌ErrorLog Here!
                Utiltiy.WriteToFile(ex, "ERROR: ClientPortal - GetGameResourceDetails.");
                return new JsonResult(NotFound());
            }
        }
        #endregion

        #region GetGameInfoDetails
        [Authorize]
        [HttpGet("[Action]")]
        public JsonResult GetGameInfoDetails(int GameId)
        {
            try
            {
                if (GameId >= 0)
                {
                    var result = _clientPortalRepository.GetGameInfoDetails(GameId);
                    return new JsonResult(result);
                }
                else
                {

                    return new JsonResult(NotFound());
                }

            }
            catch (Exception ex)
            {
                Utiltiy.WriteToFile(ex, "ERROR: ClientPortal - GetGameInfoDetails.");
                return new JsonResult(NotFound());
            }
        }
        #endregion

        #region GetGameResouceTypeName
        [Authorize]
        [HttpGet("[Action]")]
        public JsonResult GetGameResouceTypeName()
        {
            try
            {
                var result = _clientPortalRepository.GetGameResouceTypeName();
                if (null != result)
                {
                    return new JsonResult(result);
                }
                else
                {
                    return new JsonResult(NotFound());
                }
            }
            catch (Exception ex)
            {
                //TODO: Write ❌ErrorLog Here!
                Utiltiy.WriteToFile(ex, "ERROR: ClientPortal - GetGameResouceTypeName.");
                return new JsonResult(NotFound());
            }
        }
        #endregion

        #region AddGameResourceDetails
        [Authorize]
        [HttpPost("[Action]")]
        public JsonResult AddGameResourceDetails(List<AdminResource> adminResources)
        {
            try
            {
                var result = _clientPortalRepository.AddGameResourceDetails(adminResources);
                if (null != result)
                {
                    return new JsonResult(result);
                }
                else
                {
                    return new JsonResult(NotFound());
                }
            }
            catch (Exception ex)
            {
                Utiltiy.WriteToFile(ex, "ERROR: ClientPortal - AddGameResourceDetails.");
                return new JsonResult(NotFound());
            }
        }
        #endregion

        #region FileUpload
        [Authorize]
        [RequestSizeLimit(3145728000)]
        [HttpPost("[action]")]
        public IActionResult FileUpload(IFormFile file)
        {
            try
            {
                MultipartFormDataContent multiContent = new MultipartFormDataContent();
                var httpClient = new HttpClient() { BaseAddress = new Uri(FileUploadApiUrl) };
                httpClient.Timeout = TimeSpan.FromMinutes(30);
                httpClient.DefaultRequestHeaders.Accept.Clear();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                byte[] data;
                using (var br = new BinaryReader(file.OpenReadStream()))
                    data = br.ReadBytes((int)file.OpenReadStream().Length);

                ByteArrayContent bytes = new ByteArrayContent(data);

                multiContent.Add(bytes, "file", file.FileName);// file.FileName);

                var HttpResp = httpClient.PostAsync("Upload", multiContent).Result;

                ImagesDetails imagedetail = new ImagesDetails();

                if (HttpResp.IsSuccessStatusCode)
                {
                    imagedetail = HttpResp.Content.ReadAsAsync<ImagesDetails>().Result;

                    return Ok(imagedetail);
                }
                else
                {
                    Console.WriteLine("Cannot Connect to API ");
                }
                httpClient.DefaultRequestHeaders.Accept.Clear();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            }
            catch (Exception ex)
            {
                Utiltiy.WriteToFile(ex, "ERROR: ClientPortal - FileUpload.");
            }

            return null;
        }
        #endregion

        #region GameInfoUpload
        [Authorize]
        [RequestSizeLimit(3145728000)]
        [HttpPost("[action]")]
        public IActionResult GameInfoUpload(IFormFile file)
        {
            try
            {
                MultipartFormDataContent multiContent = new MultipartFormDataContent();
                var httpClient = new HttpClient() { BaseAddress = new Uri(FileUploadApiUrl) };
                httpClient.Timeout = TimeSpan.FromMinutes(30);
                httpClient.DefaultRequestHeaders.Accept.Clear();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                byte[] data;
                using (var br = new BinaryReader(file.OpenReadStream()))
                    data = br.ReadBytes((int)file.OpenReadStream().Length);

                ByteArrayContent bytes = new ByteArrayContent(data);

                multiContent.Add(bytes, "file", file.FileName);

                var HttpResp = httpClient.PostAsync("GameInfoUpload", multiContent).Result;

                ImagesDetails imagedetail = new ImagesDetails();

                if (HttpResp.IsSuccessStatusCode)
                {
                    imagedetail = HttpResp.Content.ReadAsAsync<ImagesDetails>().Result;
                    return Ok(imagedetail);
                }
                else
                {
                    Console.WriteLine("Cannot Connect to API ");
                }
                httpClient.DefaultRequestHeaders.Accept.Clear();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));



            }
            catch (Exception ex)
            {
                Utiltiy.WriteToFile(ex, "ERROR: ClientPortal - GameInfoUpload.");
            }
            return null;

        }
        #endregion

        #region Download
        [Authorize]
        [HttpPost("[action]")]
        public IActionResult Download(List<string> files)
        {
            try
            {
                var httpClient = new HttpClient() { BaseAddress = new Uri(FileUploadApiUrl) };
                httpClient.Timeout = TimeSpan.FromMinutes(30);
                httpClient.DefaultRequestHeaders.Accept.Clear();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var json = JsonConvert.SerializeObject(files);
                var stringContent = new StringContent(json, UnicodeEncoding.UTF8, "application/json");

                var HttpResp = httpClient.PostAsync("ZipGenerator", stringContent).Result;

                ZipFileResourceDetails zipFileResourceDetails = new ZipFileResourceDetails();
                if (HttpResp.IsSuccessStatusCode)
                {

                    zipFileResourceDetails = HttpResp.Content.ReadAsAsync<ZipFileResourceDetails>().Result;

                    return Ok(zipFileResourceDetails);
                }
                else
                {
                    Console.WriteLine("Cannot Connect to API ");
                }
                httpClient.DefaultRequestHeaders.Accept.Clear();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


            }
            catch (Exception ex)
            {

                Utiltiy.WriteToFile(ex, "ERROR: ClientPortal - Download.");
            }
            return new JsonResult(NotFound());
        }
        #endregion

        #region DeleteMany
        [Authorize]
        [HttpPost("[action]")]
        public JsonResult DeleteMany(string[] fileNames)
        {
            try
            {
                var httpClient = new HttpClient() { BaseAddress = new Uri(FileUploadApiUrl) };
                httpClient.Timeout = TimeSpan.FromMinutes(30);
                httpClient.DefaultRequestHeaders.Accept.Clear();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var json = JsonConvert.SerializeObject(fileNames);
                var stringContent = new StringContent(json, UnicodeEncoding.UTF8, "application/json");

                var HttpResp = httpClient.PostAsync("DeleteMany", stringContent).Result;

                if (HttpResp.IsSuccessStatusCode)
                {

                    var response = HttpResp.Content.ReadAsAsync<string>().Result;

                    return new JsonResult(response);
                }
                else
                {
                    Console.WriteLine("Cannot Connect to API ");
                }
                httpClient.DefaultRequestHeaders.Accept.Clear();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            }
            catch (Exception ex)
            {

                Utiltiy.WriteToFile(ex, "ERROR: ClientPortal - DeleteMany.");
            }
            return new JsonResult(NotFound());
        }
        #endregion

        #region DeleteFile
        [Authorize]
        [HttpDelete("[action]")]
        public JsonResult DeleteFile(string FileName)
        {
            try
            {
                var httpClient = new HttpClient() { BaseAddress = new Uri(FileUploadApiUrl) };
                httpClient.Timeout = TimeSpan.FromMinutes(30);
                httpClient.DefaultRequestHeaders.Accept.Clear();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var HttpResp = httpClient.DeleteAsync($"Delete/" + FileName).Result;
                if (HttpResp.IsSuccessStatusCode)
                {
                    var response = HttpResp.Content.ReadAsAsync<string>().Result;

                    return new JsonResult(response);
                }
                else
                {
                    Console.WriteLine("Cannot Connect to API ");
                }
                httpClient.DefaultRequestHeaders.Accept.Clear();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            }
            catch (Exception ex)
            {
                Utiltiy.WriteToFile(ex, "ERROR: ClientPortal - DeleteFile.");
            }
            return new JsonResult(NotFound());
        }
        #endregion

        #region ApiReview
        //[Authorize]
        //[HttpGet("[action]")]
        //public JsonResult ApiReview()
        //{
        //    try
        //    {
        //        var httpClient = new HttpClient() { BaseAddress = new Uri(FileUploadApiUrl) };
        //        httpClient.DefaultRequestHeaders.Accept.Clear();
        //        httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        //        var HttpResp = httpClient.GetAsync("ApiReview").Result;
        //        if (HttpResp.IsSuccessStatusCode)
        //        {
        //            var response = HttpResp.Content.ReadAsAsync<string>().Result;
        //            return new JsonResult(response);
        //        }
        //        else
        //        {
        //            Console.WriteLine("Cannot Connect to API ");
        //        }
        //        httpClient.DefaultRequestHeaders.Accept.Clear();
        //        httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        //    }
        //    catch (Exception ex)
        //    {
        //        Utiltiy.WriteToFile(ex, "ERROR: ClientPortal - ApiReview.");
        //    }
        //    return new JsonResult(NotFound());
        //}
        #endregion

        #region UpdateGameList
        [Authorize]
        [HttpGet("[Action]")]
        public JsonResult UpdateGameList()
        {
            try
            {
                var result = _clientPortalRepository.UpdateGameList();
                if (null != result)
                {
                    return new JsonResult(result);
                }
                else
                {
                    return new JsonResult(NotFound());
                }
            }
            catch (Exception ex)
            {
                Utiltiy.WriteToFile(ex, "ERROR: ClientPortal - UpdateGameList.");
                return new JsonResult(NotFound());
            }
        }
        #endregion

        #region AddGameInfoDetails
        [Authorize]
        [HttpPost("[action]")]
        public JsonResult AddGameInfoDetails(GameInfoDetails gameinfo)
        {
            try
            {
                if (gameinfo == null)
                {
                    return new JsonResult(NotFound());
                }
                else
                {
                    var result = _clientPortalRepository.AddGameInfoDetails(gameinfo);
                    if (null != result)
                    {
                        return new JsonResult(result);
                    }
                    else
                    {
                        return new JsonResult(NotFound());
                    }
                }
            }
            catch (Exception ex)
            {
                Utiltiy.WriteToFile(ex, "ERROR: ClientPortal - AddGameInfoDetails.");
                return new JsonResult(NotFound());
            }
        }
        #endregion

        #region AddNewsEventsDetails
        [Authorize]
        [HttpPost("[action]")]
        public JsonResult AddNewsEventsDetails(News_Event newsEventsDetails)
        {
            try
            {
                if (newsEventsDetails == null)
                {
                    return new JsonResult(NotFound());
                }
                else
                {
                    var result = _clientPortalRepository.AddNewsEventsDetails(newsEventsDetails);
                    if (null != result)
                    {
                        return new JsonResult(result);
                    }
                    else
                    {
                        return new JsonResult(NotFound());
                    }
                }

            }
            catch (Exception ex)
            {
                Utiltiy.WriteToFile(ex, "ERROR: ClientPortal - AddNewsEventsDetails.");
                return new JsonResult(NotFound());
            }
        }
        #endregion

        #region GetAppVersion
        [HttpGet("[Action]")]
        public JsonResult GetAppVersion()
        {
            return new JsonResult(AppSettings.Version.ToString());
        }
        #endregion

        #region Default Api Scaffolding
        //// GET: api/ClientPortalWeb/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST: api/ClientPortalWeb
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT: api/ClientPortalWeb/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
        #endregion


    }
}







