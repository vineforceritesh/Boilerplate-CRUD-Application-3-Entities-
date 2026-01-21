using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Cities.Dto;

namespace UserCrud.Cities
{
    public class CityMapperProfile : Profile
    {

        public CityMapperProfile()
        {
            CreateMap<CreateCityDto, City>();
            CreateMap<UpdateCityDto, City>();
            CreateMap<City, CityDto>();

        }
    }
}
