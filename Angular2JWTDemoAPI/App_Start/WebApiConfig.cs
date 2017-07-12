using Angular2JWTDemoAPI.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Angular2JWTDemoAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            //config.SetCorsPolicyProviderFactory(new Angular2JWTCorsPolicyFactory());
            //config.EnableCors();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
