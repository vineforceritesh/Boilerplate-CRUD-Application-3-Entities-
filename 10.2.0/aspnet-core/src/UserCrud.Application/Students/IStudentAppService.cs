using Abp.Application.Services;
using Abp.Application.Services.Dto;
using UserCrud.Students.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace UserCrud.Students
{
    public interface IStudentAppService : IApplicationService
    {
        Task<List<StudentDto>> GetAllAsync();
        Task<StudentDto> CreateAsync(CreateStudentDto input);
        Task<StudentDto> UpdateAsync(UpdateStudentDto input);
        Task DeleteAsync(EntityDto<int> input);
    }
}
