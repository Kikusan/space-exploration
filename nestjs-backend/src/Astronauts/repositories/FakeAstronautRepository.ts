import { Injectable } from '@nestjs/common';

import { Astronaut } from '../entities/astronaut.entity';
import { IAstronautRepository } from './IAstronautRepository';

@Injectable()
export class FakeAstronautRepository implements IAstronautRepository {
  constructor(
  ) { }
  astronauts: Astronaut[] = [
    {
      id: 'riri id',
      createdAt: new Date('2025-02-12T10:16:21.593Z'),
      updatedAt: new Date('2025-02-12T10:16:21.593Z'),
      firstname: 'riri',
      lastname: 'duck',
      originPlanet: {
        name: 'Moon',
        id: 'id',
        astronauts: []
      }
    },
    {
      id: 'fifi id',
      createdAt: new Date('2025-02-12T10:16:21.593Z'),
      updatedAt: new Date('2025-02-12T10:16:21.593Z'),
      firstname: 'fifi',
      lastname: 'duck',
      originPlanet: {
        name: 'Moon',
        id: 'id',
        astronauts: []
      }
    },
    {
      id: 'loulou id',
      createdAt: new Date('2025-02-12T10:16:21.593Z'),
      updatedAt: new Date('2025-02-12T10:16:21.593Z'),
      firstname: 'loulou',
      lastname: 'duck',
      originPlanet: {
        name: 'Moon',
        id: 'id',
        astronauts: []
      }
    }
  ];
  getAstronauts() {
    return Promise.resolve(this.astronauts);
  }

  getAstronautbyId(id: string) {
    const astronaut = this.astronauts.find(astronaut => astronaut.id === id)
    if (!astronaut)
      throw new Error('not found')
    return Promise.resolve(astronaut)
  }

  async saveAstronaut(newAstronaut: Astronaut) {
    this.astronauts.push(newAstronaut);
    return Promise.resolve(newAstronaut)
  }

  updateAstronaut(updatedAstronaut: Astronaut) {
    this.astronauts = this.astronauts.map(astronaut =>
      astronaut.id === updatedAstronaut.id ? updatedAstronaut : astronaut
    );
    return Promise.resolve(updatedAstronaut)
  }

  async fireAstronaut(id: string) {
    this.astronauts = this.astronauts.filter(astronaut => astronaut.id !== id)
    return this.getAstronauts()
  }
}