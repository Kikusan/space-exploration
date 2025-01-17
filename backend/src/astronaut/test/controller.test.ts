import { Request, Response } from 'express';
import { AstronautController } from './../controller';
import { AstronautService } from './../service';
import { FakeAstronautRepository } from './fakeRepository';

describe('AstronautController', () => {
    const fakeRepository = new FakeAstronautRepository()
    const astronautService = new AstronautService(fakeRepository)
    const astronautController = new AstronautController(astronautService);
    const fakeRepositoryWithError = new FakeAstronautRepository(true)
    const astronautServiceWithError = new AstronautService(fakeRepositoryWithError)
    const astronautControllerWithError = new AstronautController(astronautServiceWithError);
    let req: Partial<Request>;
    let res: Partial<Response>;
    beforeEach(() => {


        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
    describe('GET /astronauts', () => {
        it('should return a list of astronauts with status 200', async () => {
            await astronautController.getAll(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(fakeRepository.astronauts);
        });

        it('should return status 500 and error message if an unexpected error occurs', async () => {
            await astronautControllerWithError.getAll(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'database error' });
        });
    })

    describe('GET /astronauts/:id', () => {
        it('should return an astronaut with status 200', async () => {
            req = { params: { id: "2" } }
            const expectedResult = { id: 2, firstname: 'Jane', lastname: 'Smith', originPlanet: { id: 1, name: 'Planet 1' } }
            await astronautController.getById(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expectedResult);
        });
        it('should return astronaut not found with status 404 when astronaut not found', async () => {
            req = { params: { id: "2000" } }
            await astronautController.getById(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'astronaut not found' });
        });

        it('should return database error with status 500 when database is down', async () => {
            req = { params: { id: "2" } }
            await astronautControllerWithError.getById(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'database error' });
        });
    })

    describe('POST /astronauts', () => {

        it('should return a list of astronauts with status 201', async () => {
            req = { body: { firstname: 'Marcel', lastname: 'Dupont', originPlanetId: '3' } }
            const expectedResult = { id: 3, firstname: 'Marcel', lastname: 'Dupont', originPlanet: { id: 3, name: 'Planet 3' } }
            await astronautController.create(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expectedResult);
        });

        it('should return status 500 and error message if an unexpected error occurs', async () => {
            req = { body: { firstname: 'Marcel', lastname: 'Dupont', originPlanetId: '3' } }
            await astronautControllerWithError.create(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'database error' });
        });
    })

    describe('PUT /astronauts/:id', () => {
        it('should return an astronaut with status 200', async () => {
            req = { params: { id: "2" }, body: { firstname: 'Marcel', lastname: 'Dupont', originPlanetId: '3' } }
            const expectedResult = { id: 2, firstname: 'Marcel', lastname: 'Dupont', originPlanet: { id: 3, name: 'Planet 3' } }
            await astronautController.update(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expectedResult);
        });
        it('should return astronaut not found with status 404 when astronaut not found', async () => {
            req = { params: { id: "2000" }, body: { firstname: 'Marcel', lastname: 'Dupont', originPlanetId: '3' } }
            await astronautController.getById(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'astronaut not found' });
        });

        it('should return database error with status 500 when database is down', async () => {
            req = { params: { id: "2" }, body: { firstname: 'Marcel', lastname: 'Dupont', originPlanetId: '3' } }
            await astronautControllerWithError.getById(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'database error' });
        });
    })

    describe('DELETE /astronauts/:id', () => {
        it('should return an astronaut with status 204', async () => {
            req = { params: { id: "2" } }
            await astronautController.delete(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalledWith(undefined);
        });
        it('should return astronaut not found with status 404 when astronaut not found', async () => {
            req = { params: { id: "2000" } }
            await astronautController.delete(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'astronaut not found' });
        });

        it('should return database error with status 500 when database is down', async () => {
            req = { params: { id: "2" } }
            await astronautControllerWithError.delete(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'database error' });
        });
    })
});
