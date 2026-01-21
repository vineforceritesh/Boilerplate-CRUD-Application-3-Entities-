using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserCrud.Collages.Dto;

namespace UserCrud.Collages
{
    public interface ICollageAppService : IApplicationService
    {
        Task<List<CollegeDto>> GetAllAsync();
        Task<CollegeDto> CreateAsync(CreateCollegeDto input);
        Task<CollegeDto> UpdateAsync(UpdateCollegeDto input);
        Task DeleteAsync(EntityDto<int> input);


    }


}
