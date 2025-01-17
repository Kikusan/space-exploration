import { Request, Response } from 'express';
import { AstronautController } from './../controller';
import { AstronautService } from './../service';
import IAstronautRepository from "./../interfaces/IAstronautRepository";
import Astronaut from './../entities/Astronaut';

describe('AstronautController - getAll', () => {
    const mockAstronauts: Astronaut[] = [
        { id: 1, firstname: 'John', lastname: 'Doe', originPlanet: { id: 1, name: 'Earth' } },
        { id: 2, firstname: 'Jane', lastname: 'Smith', originPlanet: { id: 1, name: 'Earth' } },
    ];
    const mockRepository: jest.Mocked<IAstronautRepository> = {
        getAll: jest.fn(() => Promise.resolve(mockAstronauts)),
        getById: jest.fn((id: number) => Promise.resolve({ id: 1, firstname: 'John', lastname: 'Doe', originPlanet: { id: 1, name: 'Earth' } })),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }

    const astronautService = new AstronautService(mockRepository)
    const astronautController = new AstronautController(astronautService);
    let req: Partial<Request>;
    let res: Partial<Response>;
    beforeEach(() => {


        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should return a list of astronauts with status 200', async () => {
        await astronautController.getAll(req as Request, res as Response);
        expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockAstronauts);
    });

    it('should return status 500 and error message if an unexpected error occurs', async () => {
        // Arrange
        const errorMessage = 'Internal Server Error';
        mockRepository.getAll.mockRejectedValue(new Error(errorMessage));

        // Act
        await astronautController.getAll(req as Request, res as Response);

        // Assert
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });

    it('should return a list of astronauts with status 200', async () => {
        req = { params: { id: "1" } }
        await astronautController.getById(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockAstronauts[0]);
    });
    // it('should return status 500 and error message if an unexpected error occurs', async () => {
    //     // Arrange
    //     const errorMessage = 'Internal Server Error';
    //     astronautServiceMock.getAll.mockRejectedValue(new Error(errorMessage));

    //     // Act
    //     await astronautController.getAll(req as Request, res as Response);

    //     // Assert
    //     expect(astronautServiceMock.getAll).toHaveBeenCalledTimes(1);
    //     expect(res.status).toHaveBeenCalledWith(500);
    //     expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    // });

    // it('should return a specific error message and status if ErrorWithStatus is thrown', async () => {
    //     // Arrange
    //     const customError = { statusCode: 400, message: 'Bad Request' };
    //     astronautServiceMock.getAll.mockRejectedValue(customError);

    //     // Act
    //     await astronautController.getAll(req as Request, res as Response);

    //     // Assert
    //     expect(astronautServiceMock.getAll).toHaveBeenCalledTimes(1);
    //     expect(res.status).toHaveBeenCalledWith(customError.statusCode);
    //     expect(res.json).toHaveBeenCalledWith({ error: customError.message });
    // });
});
