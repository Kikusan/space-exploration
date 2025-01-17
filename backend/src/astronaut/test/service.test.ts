import { AstronautService } from '../service';
import { FakeAstronautRepository } from './fakeRepository'
import AstronautToCreate from './../entities/AstronautToCreate';
import AstronautToUpdate from './../entities/AstronautToUpdate';
import NotFoundError from '../../common/notFoundError';
import UnexpectedError from '../../common/unexpectedError';


describe('AstronautService', () => {
    let astronautService: AstronautService;
    const fakeRepository = new FakeAstronautRepository();
    const fakeRepositoryWithError = new FakeAstronautRepository(true);
    const astronautServiceFailure: AstronautService = new AstronautService(fakeRepositoryWithError);
    beforeEach(() => {
        astronautService = new AstronautService(fakeRepository);
    });

    describe('getAll', () => {
        it('should return all astronauts', async () => {
            const result = await astronautService.getAll();
            expect(result).toEqual(fakeRepository.astronauts);
        });
        it('should throw an UnexpectedError if astronaut not found', async () => {
            await expect(astronautServiceFailure.getAll()).rejects.toThrow(UnexpectedError);
        });
    });

    describe('getById', () => {
        it('should return an astronaut by id', async () => {
            const expectedResult = { id: 2, firstname: 'Jane', lastname: 'Smith', originPlanet: { id: 1, name: 'Planet 1' } }
            const result = await astronautService.getById(2);

            expect(result).toEqual(expectedResult);
        });

        it('should throw an NotFoundError if astronaut not found', async () => {
            await expect(astronautService.getById(999)).rejects.toThrow(NotFoundError);
        });

        it('should throw an UnexpectedError if unknwon error', async () => {
            await expect(astronautServiceFailure.getById(2)).rejects.toThrow(UnexpectedError);
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

        it('should throw an UnexpectedError if unknwon error', async () => {
            const astronautToCreate: AstronautToCreate = { firstname: 'John', lastname: 'Doe', originPlanetid: 2 }
            await expect(astronautServiceFailure.create(astronautToCreate)).rejects.toThrow(UnexpectedError);
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
        it('should throw an NotFoundError if astronaut not found', async () => {
            const astronautToUpdate: AstronautToUpdate = { id: 999, firstname: 'Robert', lastname: 'Robichet', originPlanetId: 5 }
            await expect(astronautService.update(astronautToUpdate)).rejects.toThrow(NotFoundError);
        });

        it('should throw an UnexpectedError if unknwon error', async () => {
            const astronautToUpdate: AstronautToUpdate = { id: 1, firstname: 'Robert', lastname: 'Robichet', originPlanetId: 5 }
            await expect(astronautServiceFailure.update(astronautToUpdate)).rejects.toThrow(UnexpectedError);
        });
    });


    describe('delete', () => {
        it('should delete an astronaut', async () => {
            await astronautService.delete(2);
            await expect(astronautService.getById(2)).rejects.toThrow(NotFoundError);
        });

        it('should throw an NotFoundError if astronaut not found', async () => {
            await expect(astronautService.delete(999)).rejects.toThrow(NotFoundError);
        });

        it('should throw an UnexpectedError if unknwon error', async () => {
            await expect(astronautServiceFailure.delete(2)).rejects.toThrow(UnexpectedError);
        });

    });
});
