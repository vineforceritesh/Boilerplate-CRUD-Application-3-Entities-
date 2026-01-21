using AutoMapper;
using UserCrud.Students.Dto;
using UserCrud.Students;

namespace UserCrud.Students
{
    public class StudentMapProfile : Profile
    {
        public StudentMapProfile()
        {
            CreateMap<CreateStudentDto, Student>();
            CreateMap<UpdateStudentDto, Student>();
            CreateMap<Student, StudentDto>();
        }
    }
}
