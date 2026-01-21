using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.States.Dto;


namespace UserCrud.States
{
    public class StateMapperProfile : Profile
    {
        public StateMapperProfile()
        {
            CreateMap<CreateStateDto, State>();
            CreateMap<UpdateStateDto, State>();
            CreateMap<State, StateDto>();
        }
    }

}
