// src/routes/AstronautRouter.ts
import express from 'express';
import { AstronautController } from './controller';
import { AstronautService } from './service';
import { KnexAstronautRepository } from './knexRepository'

const astronautRepository = new KnexAstronautRepository();
const astronautService = new AstronautService(astronautRepository);
const astronautController = new AstronautController(astronautService);
const router = express.Router();

router.get('/', astronautController.getAll);
router.get('/:id', astronautController.getById);
router.post('/', astronautController.create);
router.put('/:id', astronautController.update);
router.delete('/:id', astronautController.delete);

export default router;
