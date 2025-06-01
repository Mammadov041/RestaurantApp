using AutoMapper;
using RestaurantAPI.Dtos;
using RestaurantAPI.Models;

namespace RestaurantAPI.AutoMappers
{
    public class _AutoMapper : Profile
    {
        public _AutoMapper()
        {
            CreateMap<OrderDetailDto, OrderDetail>().ReverseMap();
            CreateMap<OrderMasterDto, OrderMaster>().ReverseMap();
            CreateMap<FoodItemDto, FoodItem>().ReverseMap();
        }
    }
}
