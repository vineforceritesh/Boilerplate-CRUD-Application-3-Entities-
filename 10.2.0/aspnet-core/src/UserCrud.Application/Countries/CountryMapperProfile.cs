using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Countries.Dto;

namespace UserCrud.Countries
{
    public class CountryMapperProfile : Profile
    {
        public CountryMapperProfile()
        {
            // Entity → DTO
            CreateMap<Country, CountryDto>();

            // Create DTO → Entity
            CreateMap<CreateCountryDto, Country>();

            // Update DTO → Entity
            CreateMap<UpdateCountryDto, Country>();
        }
    }
}
