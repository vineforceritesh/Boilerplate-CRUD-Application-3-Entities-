using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Doctors.Dto;

namespace UserCrud.Doctors
{

    public class DoctorsAppService : ApplicationService, IDoctorsAppService
    {
        private readonly IRepository<Doctor, long> _doctorRepository;
        public DoctorsAppService(IRepository<Doctor, long> doctorRepository)
        {
            _doctorRepository = doctorRepository;
        }


        public async Task<List<DoctorsDto>> GetAllDoctorsAsync()
        {
            try
            {
                var doctors = await _doctorRepository.GetAllListAsync();
                var data = ObjectMapper.Map<List<DoctorsDto>>(doctors);
                return data;
            }
            catch(Exception ex)
            {
                throw new UserFriendlyException("An error occurred while retrieving doctors.", ex.Message);
            }
        }
        public async Task<DoctorsDto> GetDoctorByIdAsync(long Id)
        {
           try
                {
                 var doctor = await _doctorRepository.GetAsync(Id);
                 var data = ObjectMapper.Map<DoctorsDto>(doctor);
                 return data;
              }
              catch(Exception ex)
              {
                 throw new UserFriendlyException("Doctor not found.", ex.Message);
            }
        }

        public async Task<DoctorsDto> CreateDoctorAsync(CreateDoctorsDto input)
        {
            try
            {
                var existingDoctor = _doctorRepository.FirstOrDefault(d => d.DoctorCode == input.DoctorCode);
                if (existingDoctor != null)
                {
                    throw new UserFriendlyException($"A doctor with the code '{input.DoctorCode}' already exists.");
                }

                var EmailExists = _doctorRepository.FirstOrDefault(d => d.Email == input.Email);
                if (EmailExists != null)
                {
                    throw new UserFriendlyException($"A doctor with the email '{input.Email}' already exists.");
                }


                var doctor = ObjectMapper.Map<Doctor>(input);
                var createdDoctor = await _doctorRepository.InsertAsync(doctor);
                var data = ObjectMapper.Map<DoctorsDto>(createdDoctor);
                return data;
            }
            catch(UserFriendlyException)
            {
                throw;
            }
            catch(Exception ex)
            {
                throw new UserFriendlyException("An error occurred while creating the doctor.", ex.Message);


            }
        }

        public async Task<DoctorsDto> UpdateDoctorAsync(UpdateDoctorsDto input)
        {
            try
            {
                var doctor = await _doctorRepository.GetAsync(input.Id);
                ObjectMapper.Map(input, doctor);
                var updatedDoctor = await _doctorRepository.UpdateAsync(doctor);
                var data = ObjectMapper.Map<DoctorsDto>(updatedDoctor);
                return data;
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("An error occurred while updating the doctor.", ex.Message);
            }
        }

        public async Task DeleteDoctorAsync(long Id)
        {
            await _doctorRepository.DeleteAsync(Id);
        }

    }

    
}
