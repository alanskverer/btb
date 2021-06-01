using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.DTO
{
    public class BankAccountsDTO
    {
        public BankAccountDTO[] bankAccountDTOs;
        public string holdingPercentage;
    }
}