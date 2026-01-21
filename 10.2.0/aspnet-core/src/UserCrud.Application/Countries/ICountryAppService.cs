using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserCrud.Countries.Dto;

namespace UserCrud.Countries
{
    public interface ICountryAppService : IApplicationService
    {
        Task<List<NameValueDto>> GetCountryLookupAsync();

        Task<ListResultDto<CountryDto>> GetAllAsync();

        Task<CountryDto> CreateAsync(CreateCountryDto input);

        Task<CountryDto> UpdateAsync(UpdateCountryDto input);

        Task DeleteAsync(EntityDto<int> input);
    }
}
