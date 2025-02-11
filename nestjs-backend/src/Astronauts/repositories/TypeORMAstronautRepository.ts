import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Astronaut } from '../entities/astronaut.entity';
import { IAstronautRepository } from './IAstronautRepository';

@Injectable()
export class TypeOrmAstronautRepository implements IAstronautRepository {
  constructor(
    @InjectRepository(Astronaut)
    private readonly astronautRepository: Repository<Astronaut>,
  ) { }

  getAstronauts() {
    return this.astronautRepository.find();
  }

  getAstronautbyId(id: string) {
    return this.astronautRepository.findOne({ where: { id } });
  }

  async saveAstronaut(newAstronaut: Astronaut) {
    return this.astronautRepository.save(newAstronaut);
  }

  updateAstronaut(updatedAstronaut: Astronaut) {
    return this.astronautRepository.save(updatedAstronaut);
  }

  async fireAstronaut(id: string) {
    await this.astronautRepository.delete(id)
    return this.getAstronauts()
  }
}