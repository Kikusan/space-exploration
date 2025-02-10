import { Module } from '@nestjs/common';

import { AstronautController } from './controller';
import { AstronautService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Astronaut } from './entities/astronaut.entity';
import { Planet } from './entities/planet.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Astronaut, Planet
    ]),
  ],
  controllers: [AstronautController],
  providers: [AstronautService],
})
export class AstronautModule { }
