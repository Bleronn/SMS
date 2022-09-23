using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales_Managment_System.Common.Models
{
    public class UserDto
    {
        public string Token { get; set; }
        public string Username { get; set; }
        public string Id { get; set; }
        public string Email { get; set; }
    }
}
