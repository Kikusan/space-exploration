import { AstronautService } from './service';
import { Astronaut } from './entities/astronaut.entity';
import { Planet } from './entities/planet.entity';
import { Recruit } from './domainObjects/recruit';
import { FakeAstronautRepository } from './repositories/FakeAstronautRepository';
import { FakePlanetRepository } from './repositories/FakePlanetRepository';

describe('AstronautService', () => {

  let service: AstronautService;
  let astronautRepository: FakeAstronautRepository;
  let planetRepository: FakePlanetRepository
  beforeEach(() => {
    astronautRepository = new FakeAstronautRepository();
    planetRepository = new FakePlanetRepository()
    service = new AstronautService(astronautRepository, planetRepository);
  })

  it('should get all astronauts', async () => {
    const result = await service.getAstronauts()
    expect(result).toEqual(astronautRepository.astronauts);
  });

  it('should get an astronaut by ID', async () => {
    const expectedResult = {
      id: 'riri id',
      createdAt: new Date('2025-02-12T10:16:21.593Z'),
      updatedAt: new Date('2025-02-12T10:16:21.593Z'),
      firstname: 'riri',
      lastname: 'duck',
      originPlanet: {
        name: 'Moon',
        id: 'id',
        astronauts: []
      }
    }
    const result = await service.getAstronautbyId('riri id')
    expect(result).toEqual(expectedResult);
  });

  it('should recruit an astronaut', async () => {
    const recruit: Recruit = { firstname: 'John', lastname: 'Doe' };
    const planet: Planet = { id: 'id', name: 'moon', astronauts: [] } as Planet;
    const savedAstronaut: Astronaut = { firstname: 'John', lastname: 'Doe', originPlanet: planet } as Astronaut;

    const result = await service.recruitAstronaut(recruit, 'id');
    expect(result).toEqual(savedAstronaut);
  });

  it('should update an astronaut', async () => {
    const updatedAstronaut: Astronaut = {
      id: 'riri id',
      createdAt: new Date('2025-02-12T10:16:21.593Z'),
      updatedAt: new Date('2025-02-12T10:16:21.593Z'),
      firstname: 'riri ruka',
      lastname: 'fuck',
      originPlanet: {
        name: 'DuckTown',
        id: 'DuckTown id',
        astronauts: []
      }
    };
    await service.updateAstronaut(updatedAstronaut)
    const riri = astronautRepository.astronauts.find(astronaut => astronaut.id === 'riri id')
    expect(riri).toEqual(updatedAstronaut)
  });

  it('should fire an astronaut', async () => {
    await service.fireAstronaut('riri id');
    const riri = astronautRepository.astronauts.find(astronaut => astronaut.id === 'riri id')
    expect(astronautRepository.astronauts).toHaveLength(2)
    expect(riri).toBeUndefined()
  });
});
