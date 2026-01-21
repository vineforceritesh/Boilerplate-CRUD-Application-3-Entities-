using AutoMapper;
using UserCrud.Collages.Dto;

namespace UserCrud.Collages
{
    public class CollageMapProfile : Profile
    {
        public CollageMapProfile()
        {
            CreateMap<Collage, CollegeDto>();
            CreateMap<CreateCollegeDto, Collage>();
            CreateMap<UpdateCollegeDto, Collage>();
        }
    }
}
