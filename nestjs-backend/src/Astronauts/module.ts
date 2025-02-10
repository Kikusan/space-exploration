import { Module } from '@nestjs/common';

import { AstronautController } from './controller';
import { AstronautService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Astronaut } from './entities/astronaut.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Astronaut
    ]),
  ],
  controllers: [AstronautController],
  providers: [AstronautService],
})
export class AstronautModule { }
