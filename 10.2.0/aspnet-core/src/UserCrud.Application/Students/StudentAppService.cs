using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserCrud.Cities;
using UserCrud.Collages;
using UserCrud.Countries;
using UserCrud.States;
using UserCrud.Students;
using UserCrud.Students.Dto;

namespace UserCrud.Student
{
    [AbpAuthorize]
    public class StudentAppService : ApplicationService, IStudentAppService
    {
        private readonly IRepository<Students.Student, int> _studentRepository;
        private readonly IRepository<Collage, int> _collegeRepository;
        private readonly IRepository<Country, int> _countryRepository;
        private readonly IRepository<State, int> _stateRepository;
        private readonly IRepository<City, int> _cityRepository;

        public StudentAppService(
            IRepository<Students.Student, int> studentRepository,
            IRepository<Collage, int> collegeRepository,
            IRepository<Country, int> countryRepository,
            IRepository<State, int> stateRepository,
            IRepository<City, int> cityRepository)
        {
            _studentRepository = studentRepository;
            _collegeRepository = collegeRepository;
            _countryRepository = countryRepository;
            _stateRepository = stateRepository;
            _cityRepository = cityRepository;
        }

        
        // Dropdowns
      
        public async Task<List<NameValueDto>> GetCountryLookupAsync()
        {
            return (await _countryRepository.GetAllListAsync())
                .Select(x => new NameValueDto(x.Name, x.Id.ToString()))
                .ToList();
        }

        public async Task<List<NameValueDto>> GetStateLookupAsync(int countryId)
        {
            return (await _stateRepository.GetAllListAsync(x => x.CountryId == countryId))
                .Select(x => new NameValueDto(x.Name, x.Id.ToString()))
                .ToList();
        }

        public async Task<List<NameValueDto>> GetCityLookupAsync(int stateId)
        {
            return (await _cityRepository.GetAllListAsync(x => x.StateId == stateId))
                .Select(x => new NameValueDto(x.Name, x.Id.ToString()))
                .ToList();
        }

        
        // CRUD
        
        public async Task<List<StudentDto>> GetAllAsync()
        {
            var students = await _studentRepository
                .GetAll()
                .Include(x => x.Collage)
                .Include(x => x.Country)
                .Include(x => x.State)
                .Include(x => x.City)
                .ToListAsync();

            return students.Select(x => new StudentDto
            {
                Id = x.Id,
                Name = x.Name,
                Email = x.Email,
                Age = x.Age,
                CollageId = x.CollageId,
                CollegeName = x.Collage?.Name,
                CountryId = x.CountryId,
                CountryName = x.Country?.Name,
                StateId = x.StateId,
                StateName = x.State?.Name,
                CityId = x.CityId,
                CityName = x.City?.Name
            }).ToList();
        }

        public async Task<StudentDto> CreateAsync(CreateStudentDto input)
        {
            await ValidateLocationAsync(input.CountryId, input.StateId, input.CityId);

            var student = ObjectMapper.Map<Students.Student>(input);
            await _studentRepository.InsertAsync(student);
            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map<StudentDto>(student);
        }

        public async Task<StudentDto> UpdateAsync(UpdateStudentDto input)
        {
            var student = await _studentRepository.GetAsync(input.Id);

            await ValidateLocationAsync(input.CountryId, input.StateId, input.CityId);

            ObjectMapper.Map(input, student);
            await _studentRepository.UpdateAsync(student);

            return ObjectMapper.Map<StudentDto>(student);
        }

        public async Task DeleteAsync(EntityDto<int> input)
        {
            await _studentRepository.DeleteAsync(input.Id);
        }

       
        private async Task ValidateLocationAsync(int countryId, int stateId, int cityId)
        {
            if (await _countryRepository.FirstOrDefaultAsync(countryId) == null)
                throw new UserFriendlyException("Invalid Country");

            var state = await _stateRepository.FirstOrDefaultAsync(stateId);
            if (state == null || state.CountryId != countryId)
                throw new UserFriendlyException("Invalid State");

            var city = await _cityRepository.FirstOrDefaultAsync(cityId);
            if (city == null || city.StateId != stateId)
                throw new UserFriendlyException("Invalid City");
        }
    }
}
