using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserCrud.Collages.Dto;

namespace UserCrud.Collages
{
    public class CollageAppService : ApplicationService, ICollageAppService
    {
        private readonly IRepository<Collage, int> _collageRepository;

        public CollageAppService(IRepository<Collage, int> collageRepository)
        {
            _collageRepository = collageRepository;
        }


        public async Task<List<CollegeDto>> GetAllAsync()
        {
            try
            {
                var collages = await _collageRepository.GetAllListAsync();
                return ObjectMapper.Map<List<CollegeDto>>(collages);
            }
            catch (Exception)
            {
                throw new UserFriendlyException("Failed to load collage list");
            }
        }


        public async Task<CollegeDto> CreateAsync(CreateCollegeDto input)
        {
            try
            {
                var collage = ObjectMapper.Map<Collage>(input);
                var insertedCollage = await _collageRepository.InsertAsync(collage);
                return ObjectMapper.Map<CollegeDto>(insertedCollage);
            }
            catch (Exception)
            {
                throw new UserFriendlyException("Collage creation failed");
            }
        }


        public async Task<CollegeDto> UpdateAsync(UpdateCollegeDto input)
        {
            var collage = await _collageRepository.GetAsync(input.Id);
            try
            {
                ObjectMapper.Map(input, collage);
                await _collageRepository.UpdateAsync(collage);
                return ObjectMapper.Map<CollegeDto>(collage);
            }
            catch (Exception)
            {
                throw new UserFriendlyException("Collage update failed");
            }
        }


        public async Task DeleteAsync(EntityDto<int> input)
        {
            try
            {
                await _collageRepository.DeleteAsync(input.Id);
            }
            catch (Exception)
            {
                throw new UserFriendlyException("Collage deletion failed");

            }


        }


        // ✅ For Dropdown (NameValueDto)
        public async Task<List<NameValueDto>> GetCollegeLookupAsync()
        {
            try
            {
                var collages = await _collageRepository.GetAllListAsync();

                return collages
                    .Select(x => new NameValueDto(
                        x.Name,        // dropdown text
                        x.Id.ToString() // dropdown value
                    ))
                    .ToList();
            }
            catch
            {
                throw new UserFriendlyException("Failed to load college dropdown");
            }
        }
    }
}
