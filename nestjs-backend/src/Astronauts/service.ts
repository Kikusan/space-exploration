import { Astronaut } from './entities/astronaut.entity';
import { Planet } from './entities/planet.entity';
import { Recruit } from './domainObjects/recruit';
import { IAstronautRepository } from './repositories/IAstronautRepository';
import { IPlanetRepository } from './repositories/IPlanetRepository';

export class AstronautService {
  constructor(
    private readonly astronautRepository: IAstronautRepository,
    private readonly planetRepository: IPlanetRepository,
  ) { }

  getAstronauts() {
    return this.astronautRepository.getAstronauts();
  }

  getAstronautbyId(id: string) {
    return this.astronautRepository.getAstronautbyId(id);
  }

  async recruitAstronaut(recruit: Recruit, planetId: string) {
    let planet: Planet
    try {
      planet = await this.planetRepository.getPlanetById(planetId)
    } catch {
      throw new Error('planet not found')
    }
    const newRecruit: Astronaut = new Astronaut();
    newRecruit.lastname = recruit.lastname;
    newRecruit.firstname = recruit.firstname;
    newRecruit.originPlanet = planet;
    return this.astronautRepository.saveAstronaut(newRecruit);
  }

  updateAstronaut(updatedAstronaut: Astronaut) {
    return this.astronautRepository.updateAstronaut(updatedAstronaut);
  }

  async fireAstronaut(id: string) {
    await this.astronautRepository.fireAstronaut(id)
    return this.getAstronauts()
  }
}