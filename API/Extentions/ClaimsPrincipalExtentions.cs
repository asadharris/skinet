using System.Linq;
using System.Security.Claims;

namespace API.Extentions
{
    public static class ClaimsPrincipalExtentions
    {
        public static string RetrieveEamilFromPrincipal(this ClaimsPrincipal user)
        {
            return user?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
        }
    }
}