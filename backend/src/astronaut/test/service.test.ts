import { AstronautService } from '../service';
import { FakeAstronautRepository } from './fakeRepository'
import AstronautToCreate from './../entities/AstronautToCreate';
import AstronautToUpdate from './../entities/AstronautToUpdate';


describe('AstronautService', () => {
    let astronautService: AstronautService;
    const fakeRepository = new FakeAstronautRepository();
    beforeEach(() => {

        astronautService = new AstronautService(fakeRepository);
    });

    describe('getAll', () => {
        it('should return all astronauts', async () => {

            const result = await astronautService.getAll();

            expect(result).toEqual(fakeRepository.astronauts);
        });
    });

    describe('getById', () => {
        it('should return an astronaut by id', async () => {
            const expectedResult = { id: 2, firstname: 'Jane', lastname: 'Smith', originPlanet: { id: 1, name: 'Planet 1' } }
            const result = await astronautService.getById(2);

            expect(result).toEqual(expectedResult);
        });

        it('should throw an error if astronaut not found', async () => {
            await expect(astronautService.getById(999)).rejects.toThrow('not found');
        });
    });

    describe('create', () => {
        it('should create a new astronaut', async () => {
            const astronautToCreate: AstronautToCreate = { firstname: 'John', lastname: 'Doe', originPlanetid: 2 }
            const expectedResult = { id: 3, firstname: 'John', lastname: 'Doe', originPlanet: { id: 2, name: 'Planet 2' } }
            const result = await astronautService.create(astronautToCreate);
            expect(fakeRepository.astronauts.length).toEqual(3);
            expect(result).toEqual(expectedResult);
        });
    });

    describe('update', () => {
        it('should update an astronaut', async () => {
            const astronautToUpdate: AstronautToUpdate = { id: 1, firstname: 'Robert', lastname: 'Robichet', originPlanetId: 5 }
            const expectedResult = {
                id: 1, firstname: 'Robert', lastname: 'Robichet', originPlanet: { id: 5, name: 'Planet 5' }
            }

            const result = await astronautService.update(astronautToUpdate);

            expect(result).toEqual(expectedResult);
        });
    });


    describe('delete', () => {
        it('should delete an astronaut', async () => {
            await astronautService.delete(1);
            await expect(astronautService.getById(1)).rejects.toThrow('not found');
        });
    });
});
