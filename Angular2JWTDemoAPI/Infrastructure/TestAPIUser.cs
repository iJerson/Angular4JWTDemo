using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace Angular2JWTDemoAPI.Infrastructure
{
    public class TestAPIUser 
    {
        public string UserName { get; set; }
        public bool EmailConfirmed { get; set; }
    }
}