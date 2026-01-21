using Abp.Application.Services;
using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.States.Dto;

namespace UserCrud.States
{
    public interface IStateAppService : IApplicationService
    {
        
        Task<List<StateDto>> GetAllStatesAsync();
        Task<StateDto> CreateStateAsync(CreateStateDto input);
        Task<StateDto> UpdateStateAsync(UpdateStateDto input);
        Task DeleteStateAsync(int Id);


    }
}
