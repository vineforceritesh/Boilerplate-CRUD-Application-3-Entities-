using AutoMapper;
using UserCrud.Doctors.Dto;
using UserCrud.Doctors;

namespace UserCrud.Doctors
{
    public class AutoMapperDoctorProfile : Profile
    {
        public AutoMapperDoctorProfile()
        {
            CreateMap<Doctor, DoctorsDto>();
            CreateMap<CreateDoctorsDto, Doctor>();
            CreateMap<UpdateDoctorsDto, Doctor>();


           
        }
    }
}
