using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserCrud.Cities.Dto;

namespace UserCrud.Cities
{
    public class CityAppService : ApplicationService, ICityAppService
    {
        private readonly IRepository<City, int> _cityRepository;
        private readonly IMapper _mapper;

        public CityAppService(
            IRepository<City, int> cityRepository,
            IMapper mapper)
        {
            _cityRepository = cityRepository;
            _mapper = mapper;
        }

        // NameValueDto
        public async Task<List<NameValueDto>> GetCityLookupAsync()
        {
            var City = await _cityRepository.GetAllListAsync(x => x.IsActive);

            return City
                .Select(x => new NameValueDto(
                    x.Name,
                    x.Id.ToString()
                ))
                .ToList();
        }

        public async Task<CityDto> CreateCityAsync(CreateCityDto input)
        {
            var city = _mapper.Map<City>(input);
            await _cityRepository.InsertAsync(city);
            return _mapper.Map<CityDto>(city);
        }

        public async Task DeleteCityAsync(int id)
        {
            await _cityRepository.DeleteAsync(id);
        }

        public async Task<List<CityDto>> GetAllCitiesAsync()
        {
            var cities = await _cityRepository.GetAllListAsync();
            return _mapper.Map<List<CityDto>>(cities);
        }

        public async Task<CityDto> UpdateCityAsync(UpdateCityDto input)
        {
            var city = await _cityRepository.GetAsync(input.Id);
            _mapper.Map(input, city);
            return _mapper.Map<CityDto>(city);
        }
    }
}
