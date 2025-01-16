import Astronaut from "../entities/Astronaut";
import AstronautToUpdate from '../entities/AstronautToUpdate'
import AstronautToCreate from "../entities/AstronautToCreate";
export default interface IAstronautRepository {
    getAll(): Promise<Astronaut[]>;
    getById(id: number): Promise<Astronaut>;
    create(astronaut: AstronautToCreate): Promise<Astronaut>;
    update(astronaut: AstronautToUpdate): Promise<Astronaut>;
    delete(id: number): Promise<void>;
}
