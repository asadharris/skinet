using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using API.Extentions;
using API.Errors;
using System.Collections.Generic;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;
        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            _mapper = mapper;
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            var email = HttpContext.User.RetrieveEamilFromPrincipal();

            var address = _mapper.Map<AddressDto, Address>(orderDto.ShipToAddress);

            var order = await _orderService.CreateOrderAsync(email, orderDto.DeliveryMeathodId, orderDto.BasketId, address);

            if(order == null) return BadRequest(new ApiResponse(400, "Problem creating order"));

            return Ok(order);
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetOrdersForUser()
        {
            var email = HttpContext.User.RetrieveEamilFromPrincipal();

            var orders = await _orderService.GetOrdersForUserAsync(email);

            return Ok(_mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDto>>(orders));
            //return Ok(orders);
        } 

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
        {
            var email = HttpContext.User.RetrieveEamilFromPrincipal();
            
            var order = await _orderService.GetOrderByIdAsync(id, email);

            if(order == null) return NotFound(new ApiResponse(404));
            
            return _mapper.Map<Order, OrderToReturnDto>(order);
        }

        [HttpGet("deliveryMeathods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMeathod>>> GetDeliveryMeathods()
        {
            return Ok(await _orderService.GetDeliveryMeathodsAsync());
        }


    }
}