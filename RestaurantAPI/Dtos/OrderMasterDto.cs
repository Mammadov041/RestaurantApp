namespace RestaurantAPI.Dtos
{
    public class OrderMasterDto
    {
        public int Id { get; set; }
        public string OrderNumber { get; set; } = string.Empty;
        public int CustomerId { get; set; }
        public string? PMethod { get; set; }
        public decimal GTotal { get; set; }
        public List<OrderDetailDto>? OrderDetails { get; set; }
        public string DeletedOrderItemIds { get; set; } = string.Empty;
    }
}
