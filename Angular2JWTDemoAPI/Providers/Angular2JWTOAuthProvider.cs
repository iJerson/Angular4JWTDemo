using Angular2JWTDemoAPI.Infrastructure;
using Angular2JWTDemoAPI.Models;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace Angular2JWTDemoAPI.Providers
{
    public class Angular2JWTOAuthProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            string clientId = string.Empty;
            string clientSecret = string.Empty;

            if (!context.TryGetFormCredentials(out clientId, out clientSecret))
            {
                context.Rejected();
                context.SetError("invalid_client", "Failed to retrieve client credentials.");
                return;
            }

            try
            {
                //TODO VALIDATE CLIENT
                Client _client = new Client()
                {
                    Id = clientId,
                    AllowedGrant = OAuthGrant.ResourceOwner
                };

                context.OwinContext.Set("oauth:client", _client);
                context.Validated(clientId);
            }
            catch
            {
                context.Rejected();
                context.SetError("server_error");
            }
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            Client _client = context.OwinContext.Get<Client>("oauth:client");

            if (_client.AllowedGrant == OAuthGrant.ResourceOwner)
            {
                IList<string> roles = new List<string> { "admin", "superadmin" };
                TestAPIUser user = null;

                if (context.UserName.Equals("admin") && context.Password.Equals("admin"))
                {
                    user = new TestAPIUser
                    {
                        UserName = "admin",
                        EmailConfirmed = true
                    };
                }

                if (user == null)
                {
                    context.Rejected();
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }

                if (!user.EmailConfirmed)
                {
                    context.Rejected();
                    context.SetError("invalid_grant", "User did not confirm email.");
                    return;
                }

                var identity = new ClaimsIdentity("JWT");

                identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
                identity.AddClaim(new Claim("sub", context.UserName));
                identity.AddClaim(new Claim(ClaimTypes.Role, "Manager"));
                identity.AddClaim(new Claim(ClaimTypes.Role, "Supervisor"));

                var ticket = new AuthenticationTicket(identity, null);

                context.Validated(ticket);
            }
            else
            {
                // Client is not allowed for the 'Resource Owner Password Credentials Grant'.
                context.Rejected();
                context.SetError("invalid_grant", "Client is not allowed for the 'Resource Owner Password Credentials Grant'");
            }

        }
    }
}