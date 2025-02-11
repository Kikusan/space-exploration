import { Astronaut } from "../entities/astronaut.entity";

export interface IAstronautRepository {
  getAstronauts(): Promise<Astronaut[]>;
  getAstronautbyId(id: string): Promise<Astronaut | null>;
  saveAstronaut(newAstronaut: Astronaut): Promise<Astronaut>;
  updateAstronaut(updatedAstronaut: Astronaut): Promise<Astronaut>;
  fireAstronaut(id: string): Promise<Astronaut[]>;
}
