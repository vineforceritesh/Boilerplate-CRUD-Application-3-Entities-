using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserCrud.Patients
{
    public class AutoMapperProfile : Profile
    {

        public AutoMapperProfile()
        {
            CreateMap<Patients.Dto.PatientsDto, Patient>();
            CreateMap<Patient, Patients.Dto.PatientsDto>();
            CreateMap<Patients.Dto.CreatePatientsDto, Patient>();
            CreateMap<Patient, Patients.Dto.CreatePatientsDto>();
            CreateMap<Patients.Dto.UpdatePatientsDto, Patient>();
            CreateMap<Patient, Patients.Dto.UpdatePatientsDto>();
        }
    }
}
