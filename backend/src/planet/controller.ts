import { Request, Response } from 'express';
import IplanetService from './interfaces/IPlanetService';
import ErrorWithStatus from '../common/errorWithStatus';
import Planet from './entities/Planet';
import PlanetToCreate from './entities/PlanetToCreate';
import PlanetToUpdate from './entities/PlanetToUpdate';
export class PlanetController {
    private readonly planetService: IplanetService;
    constructor(planetService: IplanetService) {
        this.planetService = planetService;
    }
    getAll = async (req: Request, res: Response) => {
        const searchPlanet: string | undefined = req.query.filterName?.toString();
        try {
            const planets: Planet[] = await this.planetService.getAll(searchPlanet)
            res.status(200).json(planets);
        } catch (error) {
            console.log(error)
            if (error instanceof ErrorWithStatus) {
                res.status(error.statusCode).json({ error: error.message })
            } else {
                res.status(500).json({ error: 'Internal Server Error' })
            }
        }

    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const idToGet = parseInt(id)
            const planet: Planet = await this.planetService.getById(idToGet)
            res.status(200).json(planet);
        } catch (error) {
            console.log(error)
            if (error instanceof ErrorWithStatus) {
                res.status(error.statusCode).json({ error: error.message })
            } else {
                res.status(500).json({ error: 'Internal Server Error' })
            }
        }
    }

    create = async (req: Request, res: Response) => {
        const { name, isHabitable, imageId, description } = req.body;
        try {
            const planetToCreate: PlanetToCreate = {
                name,
                isHabitable: isHabitable === 'true',
                imageId: parseInt(imageId),
                description
            }
            const planet = await this.planetService.create(planetToCreate)
            res.status(201).json(planet);
        } catch (error) {
            console.log(error)
            if (error instanceof ErrorWithStatus) {
                res.status(error.statusCode).json({ error: error.message })
            } else {
                res.status(500).json({ error: 'Internal Server Error' })
            }
        }
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, isHabitable, imageId, description } = req.body;
        try {
            const planetToUpdate: PlanetToUpdate = {
                id: parseInt(id),
                name,
                isHabitable: isHabitable === 'true',
                imageId: parseInt(imageId),
                description
            }
            const planet = await this.planetService.update(planetToUpdate)
            res.status(200).json(planet);
        } catch (error) {
            console.log(error)
            if (error instanceof ErrorWithStatus) {
                res.status(error.statusCode).json({ error: error.message })
            } else {
                res.status(500).json({ error: 'Internal Server Error' })
            }
        }
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {

            const idToDelete = parseInt(id)
            const planet = await this.planetService.delete(idToDelete)
            res.status(200).json(planet);
        } catch (error) {
            console.log(error)
            if (error instanceof ErrorWithStatus) {
                res.status(error.statusCode).json({ error: error.message })
            } else {
                res.status(500).json({ error: 'Internal Server Error' })
            }
        }
    }
}


