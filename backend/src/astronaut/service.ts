import Astronaut from "./entities/Astronaut";
import AstronautToCreate from "./entities/AstronautToCreate";
import AstronautToUpdate from "./entities/AstronautToUpdate";
import IAstronautRepository from "./interface/IAstronautRepository";
import IAstronautService from "./interface/IAstronautService";

export class AstronautService implements IAstronautService {
    private readonly astronautRepository: IAstronautRepository;
    constructor(astronautRepository: IAstronautRepository) {
        this.astronautRepository = astronautRepository
    }
    getAll = async (): Promise<Astronaut[]> => {
        const astronauts = await this.astronautRepository.getAll();
        return astronauts;
    }
    getById = async (id: number): Promise<Astronaut> => {
        const astronaut = await this.astronautRepository.getById(id);
        return astronaut;
    }
    create = (astronaut: AstronautToCreate): Promise<Astronaut> => {
        return this.astronautRepository.create(astronaut)
    }
    update = (astronaut: AstronautToUpdate): Promise<Astronaut> => {
        return this.astronautRepository.update(astronaut)
    }
    delete = (id: number): Promise<void> => {
        return this.astronautRepository.delete(id)
    }
}