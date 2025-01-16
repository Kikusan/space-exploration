import { Request, Response } from 'express';
import IAstronautService from './interface/IAstronautService';
import AstronautToCreate from "./entities/AstronautToCreate";
import AstronautToUpdate from './entities/AstronautToUpdate';
import ErrorWithStatus from '../common/errorWithStatus';
import Astronaut from './entities/Astronaut';
export class AstronautController {
    private readonly astronautService: IAstronautService;
    constructor(astronautService: IAstronautService) {
        this.astronautService = astronautService;
    }
    getAll = async (req: Request, res: Response) => {
        try {
            const astronauts: Astronaut[] = await this.astronautService.getAll()
            res.status(200).json(astronauts);
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
            const astronaut: Astronaut = await this.astronautService.getById(idToGet)
            res.status(200).json(astronaut);
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
        const { firstname, lastname, originPlanetId } = req.body;
        try {
            const astronautToCreate: AstronautToCreate = {
                firstname,
                lastname,
                originPlanetid: parseInt(originPlanetId)
            }
            const astronaut = await this.astronautService.create(astronautToCreate)
            res.status(201).json(astronaut);
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
        const { firstname, lastname, originPlanetId } = req.body;
        try {
            const astronautToUpdate: AstronautToUpdate = {
                id: parseInt(id),
                firstname,
                lastname,
                originPlanetId: parseInt(originPlanetId)
            }
            const astronaut = await this.astronautService.update(astronautToUpdate)
            res.status(200).json(astronaut);
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
            const astronaut = await this.astronautService.delete(idToDelete)
            res.status(200).json(astronaut);
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


