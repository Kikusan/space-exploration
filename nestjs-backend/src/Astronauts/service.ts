import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Astronaut } from './entities/astronaut.entity';

@Injectable()
export class AstronautService {
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

  recruitAstronaut(recruit: Astronaut) {
    return this.astronautRepository.save(recruit);
  }

  updateAstronaut(updatedAstronaut: Astronaut) {
    return this.astronautRepository.save(updatedAstronaut);
  }
}