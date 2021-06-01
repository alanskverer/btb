using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DATA;
using WebApi.DTO;

namespace WebApi.Controllers
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {



        [HttpGet]
        [Route("login/{id}/{password}")]
        public HttpResponseMessage Login(int id, string password)
        {
            BtbDBContext db = new BtbDBContext();

            try
            {
                User user = db.Users.Where(x => x.PersonId == id).FirstOrDefault();
                if (user == null)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "משתמש לא קיים במערכת, נסה שנית");
                }

                else if (user.Password != password)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "סיסמא שגויה");
                }

                return Request.CreateResponse(HttpStatusCode.OK, "Logged in!");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "General error");

            }

        }




        [HttpGet]
        [Route("getuserinfo/{id}")]
        public HttpResponseMessage GetUserInfo(int id)
        {
            BtbDBContext db = new BtbDBContext();

            try
            {
                User user = db.Users.Where(x => x.PersonId == id).First();
                UserDTO userDTO = new UserDTO()
                {
                    firstName = user.FirstName,
                    lastName = user.LastName,
                    email = user.Email,
                    personId = user.PersonId,
                    phoneNumber = user.PhoneNumber,
                    companyName = user.CompanyName,
                    companyNumber = user.CompanyNumber,
                    dateOfBirth = user.DateOfBirth
                };


                return Request.CreateResponse(HttpStatusCode.OK, userDTO);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e.Message);

            }

        }


        [HttpPut]
        [Route("updateUserDetails/{id}")]
        public HttpResponseMessage UpdateUserDetails(int id, UserDTO userDTO)
        {
            BtbDBContext db = new BtbDBContext();

            try
            {
                User user = db.Users.Where(x => x.PersonId == id).FirstOrDefault();
                user.FirstName = userDTO.firstName;
                user.LastName = userDTO.lastName;
                user.Email = userDTO.email;
                user.DateOfBirth = (int)userDTO.dateOfBirth;
                user.CompanyName = userDTO.companyName;
                user.CompanyNumber = userDTO.companyNumber;
                user.PhoneNumber = userDTO.phoneNumber;
                db.SaveChanges();





                return Request.CreateResponse(HttpStatusCode.OK, "User detaills updated");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e.Message);

            }

        }


        [HttpPost]
        [Route("saveBankAccounts/{id}")]
        public HttpResponseMessage SaveBankAccounts(int id, BankAccountsDTO bankAccountsDTO)
        {
            BtbDBContext db = new BtbDBContext();

            try
            {
                User user = db.Users.Where(x => x.PersonId == id).FirstOrDefault();

                int userId = user.Id;


                //Store user's holding percentage
                user.HoldingPercentage = bankAccountsDTO.holdingPercentage;



                foreach (BankAccountDTO account in bankAccountsDTO.bankAccountDTOs)
                {
                    BankAccount bankAccount = new BankAccount()
                    {
                        /* Id = lastId + 1,*/
                        accountNumber = account.accountNumber,
                        bankBranchNumber = account.bankBranchNumber,
                        bankName = account.bankName,
                        userId = user.Id

                    };

                    //Save this account in DB
                    db.BankAccounts.Add(bankAccount);

                }

                db.SaveChanges();







                return Request.CreateResponse(HttpStatusCode.OK, "User bank accounts added");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e.Message);

            }

        }




        [HttpPost]
        [Route("updatelastlogindate/{id}/{date}")]
        public HttpResponseMessage SaveBankAccounts(int id, int date)
        {
            BtbDBContext db = new BtbDBContext();

            try
            {
                User user = db.Users.Where(x => x.PersonId == id).FirstOrDefault();
                user.LastLoginDate = date;

                db.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK, "User last login date updated");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e.Message);

            }

        }





    }
}