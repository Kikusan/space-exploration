import { Astronaut } from '@api/astronaut.api';

export default interface IAstronautService {
  fetchAstronauts(): Promise<Astronaut[]>;
  deleteAstronaut(id: number): Promise<Astronaut[]>;
}