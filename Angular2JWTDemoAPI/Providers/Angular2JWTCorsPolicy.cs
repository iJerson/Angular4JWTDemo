using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Cors;
using Microsoft.Owin;
using System.Web.Http.Cors;
using System.Threading;

namespace Angular2JWTDemoAPI.Providers
{
    public class Angular2JWTCorsPolicy : ICorsPolicyProvider
    {
        private CorsPolicy _policy;

        public Angular2JWTCorsPolicy()
        {
            // Create a CORS policy.
            _policy = new CorsPolicy
            {
                AllowAnyMethod = true,
                AllowAnyHeader = true
            };

            // Add allowed origins.
            _policy.Origins.Add("http://localhost:36974");
        }        

        public Task<CorsPolicy> GetCorsPolicyAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            return Task.FromResult(_policy);
        }
    }
}