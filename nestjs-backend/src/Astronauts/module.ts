import { Module } from '@nestjs/common';
import { AstronautController } from './controller';
import { AstronautService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Astronaut } from './entities/astronaut.entity';
import { Planet } from './entities/planet.entity';
import { TypeOrmAstronautRepository } from './repositories/TypeORMAstronautRepository';
import { TypeOrmPlanetRepository } from './repositories/TypeORMPlanetRepository';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Astronaut, Planet
    ]),
  ],
  controllers: [AstronautController],
  providers: [
    {
      provide: AstronautService,
      useFactory: (
        astronautRepository,
        planetRepository,

      ) => {

        return new AstronautService(
          astronautRepository,
          planetRepository,
        );
      },
      inject: [
        'astronautRepository',
        'planetRepository',
      ],
    },
    {
      provide: 'astronautRepository',
      useClass: TypeOrmAstronautRepository,
    },
    {
      provide: 'planetRepository',
      useClass: TypeOrmPlanetRepository,
    },
  ],
})
export class AstronautModule { }
