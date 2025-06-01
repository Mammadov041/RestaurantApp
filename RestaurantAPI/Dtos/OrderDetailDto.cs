namespace RestaurantAPI.Dtos
{
    public class OrderDetailDto
    {
        public int Id { get; set; }
        public long OrderMasterId { get; set; }
        public int FoodItemId { get; set; }
        public decimal FoodItemPrice { get; set; }
        public string FoodItemName { get; set; } = string.Empty;
        public int Quantity { get; set; }
    }
}
