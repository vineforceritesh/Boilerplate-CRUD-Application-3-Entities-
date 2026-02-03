using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Runtime.Validation;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using UserCrud.Patients.Dto;

namespace UserCrud.Patients
{
    public class PatientsAppService : ApplicationService, IPatientsAppService
    {
        private readonly IRepository<Patient, long> _patientRepository;

        public PatientsAppService(IRepository<Patient, long> patientRepository)
        {
            _patientRepository = patientRepository;
        }





        public async Task<List<PatientsDto>> GetAllPatientsAsync()
      {
            try
            {
                var patients = await _patientRepository.GetAllListAsync();
                var data = ObjectMapper.Map<List<PatientsDto>>(patients);
                return data;
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException(
                    "System Error",
                    "Something went wrong while retrieving patients. Please try again."
                );
            }
        }




        public async Task<PatientsDto> GetPatientByIdAsync(long Id)
        {

            try
            {
                var patient = await _patientRepository.GetAsync(Id);
                var data = ObjectMapper.Map<PatientsDto>(patient);
                return data;
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException(
                    "Not Found",
                    $"Patient with ID '{Id}' does not exist."
                );
            }
        }




        public async Task<PatientsDto> CreatePatientAsync(CreatePatientsDto input)
        {
            try
            {
                var patientExists = await _patientRepository.GetAll()
                    .AnyAsync(p => p.PatientCode == input.PatientCode);

                if (patientExists)
                {
                    throw new UserFriendlyException(
                        "Duplicate Patient Code",
                        $"Patient code '{input.PatientCode}' already exists."
                    );
                }

                var emailExists = await _patientRepository.GetAll()
                    .AnyAsync(p => p.Email == input.Email);
                if (emailExists)
                {
                    throw new UserFriendlyException(
                        "Duplicate Email",
                        $"Email '{input.Email}' is already associated with another patient."
                    );
                }

                var patient = ObjectMapper.Map<Patient>(input);
                var createdPatient = await _patientRepository.InsertAsync(patient);
                return ObjectMapper.Map<PatientsDto>(createdPatient);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException(
                    "System Error",
                    "Something went wrong while creating patient. Please try again."
                );
            }
        }






        public async Task<PatientsDto> UpdatePatientAsync(UpdatePatientsDto input)
        {
           try
            {
                var patient = await _patientRepository.GetAsync(input.Id);
                ObjectMapper.Map(input, patient);
                var updatedPatient = await _patientRepository.UpdateAsync(patient);
                var data = ObjectMapper.Map<PatientsDto>(updatedPatient);
                return data;
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException(
                    "System Error",
                    "Something went wrong while updating patient. Please try again."
                );
            }
        }






        public async Task DeletePatientAsync(long Id)
        {
            try
            {
                await _patientRepository.DeleteAsync(Id);
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException(
                    "System Error",
                    "Something went wrong while deleting patient. Please try again."
                );
            }
        }
    }
}
