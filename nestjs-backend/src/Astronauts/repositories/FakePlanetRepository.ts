import { Injectable } from '@nestjs/common';
import { Planet } from '../entities/planet.entity';
import { IPlanetRepository } from './IPlanetRepository';

@Injectable()
export class FakePlanetRepository implements IPlanetRepository {

  async getPlanetById(planetId: string) {
    const planet: Planet = {
      name: 'moon',
      id: 'id',
      astronauts: []
    }
    return planet;
  }
}