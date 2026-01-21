using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserCrud.States.Dto;

namespace UserCrud.States
{
    public class StateAppService : ApplicationService, IStateAppService
    {
        private readonly IRepository<State, int> _stateRepository;
        private readonly IMapper _mapper;

        public StateAppService(
            IRepository<State, int> stateRepository,
            IMapper mapper)
        {
            _stateRepository = stateRepository;
            _mapper = mapper;
        }

        // State Dropdown
        public async Task<List<NameValueDto>> GetStateLookupAsync()
        {
            var states = await _stateRepository.GetAllListAsync(x => x.IsActive);

            return states
                .Select(x => new NameValueDto(
                    x.Name,
                    x.Id.ToString()
                ))
                .ToList();
        }

        public async Task<StateDto> CreateStateAsync(CreateStateDto input)
        {
            var state = _mapper.Map<State>(input);
            await _stateRepository.InsertAsync(state);
            return _mapper.Map<StateDto>(state);
        }

        public async Task DeleteStateAsync(int id)
        {
            await _stateRepository.DeleteAsync(id);
        }

        public async Task<List<StateDto>> GetAllStatesAsync()
        {
            var states = await _stateRepository.GetAllListAsync();
            return _mapper.Map<List<StateDto>>(states);
        }

        public async Task<StateDto> UpdateStateAsync(UpdateStateDto input)
        {
            var state = await _stateRepository.GetAsync(input.Id);
            _mapper.Map(input, state);
            return _mapper.Map<StateDto>(state);
        }
    }
}
