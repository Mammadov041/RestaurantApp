using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantAPI.Dtos;
using RestaurantAPI.Models;

namespace RestaurantAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly RestaurantDbContext _context;
        private readonly IMapper _mapper;

        public OrderController(RestaurantDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderMaster>>> GetOrderMasters()
        {
            var orderMasters = await _context.OrderMasters
                .Include(om => om.Customer)
                .ToListAsync();
            return Ok(orderMasters);
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderMasterDto>> GetOrderMaster(long id)
        {
            var orderDetails = await (from master in _context.Set<OrderMaster>()
                                      join detail in _context.Set<OrderDetail>()
                                      on master.Id equals detail.OrderMasterId
                                      join food in _context.Set<FoodItem>()
                                      on detail.FoodItemId equals food.Id
                                      where master.Id == id
                                      select new
                                      {
                                          master.Id,
                                          OrderDetailId = detail.Id,
                                          detail.FoodItemId,
                                          detail.Quantity,
                                          detail.FoodItemPrice,
                                          detail.FoodItemName,
                                      }).ToListAsync();




            var orderMaster = await (from om in _context.Set<OrderMaster>()
                                     where om.Id == id
                                     select new
                                     {
                                         om.Id,
                                         om.OrderNumber,
                                         om.CustomerId,
                                         om.GTotal,
                                         om.PMethod,
                                         DeletedOrderItemIds = "",
                                         OrderDetails = orderDetails,
                                     }).FirstOrDefaultAsync();
            if(orderMaster == null)
            {
                return BadRequest();
            }
            return Ok(orderMaster);
        }

        // PUT: api/Order/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderMaster(long id, OrderMaster orderMaster)
        {
            if (id != orderMaster.Id)
            {
                return BadRequest();
            }

            _context.Entry(orderMaster).State = EntityState.Modified;

            //existing food items & newly added food items
            foreach (OrderDetail item in orderMaster.OrderDetails)
            {
                if (item.Id == 0)
                    _context.OrderDetails.Add(item);
                else
                    _context.Entry(item).State = EntityState.Modified;
            }

            //deleted food items
            foreach (var i in orderMaster.DeletedOrderItemIds.Split(',').Where(x => x != ""))
            {
                OrderDetail y = _context.OrderDetails.Find(Convert.ToInt64(i));
                _context.OrderDetails.Remove(y);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderMasterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        // POST: api/Order
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrderMaster>> PostOrderMaster(OrderMasterDto orderMasterDto)
        {
            var mappedOrderMaster = _mapper.Map<OrderMaster>(orderMasterDto);
            _context.OrderMasters.Add(mappedOrderMaster);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderMaster", new { id = mappedOrderMaster.Id }, orderMasterDto);
        }

        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderMaster(long id)
        {
            var orderMaster = await _context.OrderMasters.FindAsync(id);
            if (orderMaster == null)
            {
                return NotFound();
            }

            _context.OrderMasters.Remove(orderMaster);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderMasterExists(long id)
        {
            return _context.OrderMasters.Any(e => e.Id == id);
        }
    }
}
