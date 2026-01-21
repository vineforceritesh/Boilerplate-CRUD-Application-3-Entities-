using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserCrud.Countries.Dto;

namespace UserCrud.Countries
{
    public class CountryAppService : ApplicationService, ICountryAppService
    {
        private readonly IRepository<Country, int> _countryRepository;

        public CountryAppService(IRepository<Country, int> countryRepository)
        {
            _countryRepository = countryRepository;
        }

        // NameValueDto
        public async Task<List<NameValueDto>> GetCountryLookupAsync()
        {
            var countries = await _countryRepository.GetAllListAsync(x => x.IsActive);

            return countries
                .Select(x => new NameValueDto(
                    x.Name,          
                    x.Id.ToString()  
                ))
                .ToList();
        }

        public async Task<ListResultDto<CountryDto>> GetAllAsync()
        {
            var countries = await _countryRepository.GetAllListAsync();

            return new ListResultDto<CountryDto>(
                ObjectMapper.Map<List<CountryDto>>(countries)
            );
        }

        public async Task<CountryDto> CreateAsync(CreateCountryDto input)
        {
            var country = ObjectMapper.Map<Country>(input);

            await _countryRepository.InsertAsync(country);
            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map<CountryDto>(country);
        }

        public async Task<CountryDto> UpdateAsync(UpdateCountryDto input)
        {
            var country = await _countryRepository.GetAsync(input.Id);

            ObjectMapper.Map(input, country);
            await _countryRepository.UpdateAsync(country);

            return ObjectMapper.Map<CountryDto>(country);
        }

        public async Task DeleteAsync(EntityDto<int> input)
        {
            await _countryRepository.DeleteAsync(input.Id);
        }
    }
}
