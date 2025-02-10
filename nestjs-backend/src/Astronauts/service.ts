import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Astronaut } from './entities/astronaut.entity';
import { Planet } from './entities/planet.entity';
import { Recruit } from './domainObjects/recruit';

@Injectable()
export class AstronautService {
  constructor(
    @InjectRepository(Astronaut)
    private readonly astronautRepository: Repository<Astronaut>,
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,

  ) { }

  getAstronauts() {
    return this.astronautRepository.find();
  }

  getAstronautbyId(id: string) {
    return this.astronautRepository.findOne({ where: { id } });
  }

  async recruitAstronaut(recruit: Recruit, planetId: string) {
    const planet = await this.planetRepository.findOne({ where: { id: planetId } })
    if (!planet) {
      throw new Error('planet not found')
    }
    const newRecruit: Astronaut = new Astronaut();
    newRecruit.lastname = recruit.lastname;
    newRecruit.firstname = recruit.firstname;
    newRecruit.originPlanet = planet;
    return this.astronautRepository.save(newRecruit);
  }

  updateAstronaut(updatedAstronaut: Astronaut) {
    return this.astronautRepository.save(updatedAstronaut);
  }

  async fireAstronaut(id: string) {
    await this.astronautRepository.delete(id)
    return this.getAstronauts()
  }
}