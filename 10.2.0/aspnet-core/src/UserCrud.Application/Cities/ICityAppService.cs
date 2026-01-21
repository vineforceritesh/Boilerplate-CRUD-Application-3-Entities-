using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserCrud.Cities
{
    public interface ICityAppService : IApplicationService
    {
        Task<List<Dto.CityDto>> GetAllCitiesAsync();
        Task<Dto.CityDto> CreateCityAsync(Dto.CreateCityDto input);
        Task<Dto.CityDto> UpdateCityAsync(Dto.UpdateCityDto input);
        Task DeleteCityAsync(int Id);
    }
}
