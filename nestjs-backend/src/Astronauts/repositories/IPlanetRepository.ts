import { Planet } from "../entities/planet.entity";

export interface IPlanetRepository {
  getPlanetById(planetId: string): Promise<Planet>
}
