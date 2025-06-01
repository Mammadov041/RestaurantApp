using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantAPI.Models
{
    public class OrderDetail
    {
        [Key]
        public long Id { get; set; }

        public long OrderMasterId { get; set; }

        public int FoodItemId { get; set; }
        public FoodItem? FoodItem { get; set; }

        public decimal FoodItemPrice { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string FoodItemName { get; set; } = string.Empty;
        public OrderMaster? OrderMaster {  get; set; }

        public int Quantity { get; set; }
    }
}
