import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AstronautService } from './service';
import { ApiTags } from '@nestjs/swagger';
import { Astronaut } from './entities/astronaut.entity';
import { RecruitAstronautDTO } from './dto/astronaut.dto';
import { Recruit } from './domainObjects/recruit';

@Controller('astronauts')
@ApiTags('astronauts')
export class AstronautController {
  constructor(private readonly astronautService: AstronautService) { }

  @Get()
  async getAstronauts(): Promise<Astronaut[]> {
    return this.astronautService.getAstronauts();
  }

  @Get(':id')
  async getAstronautById(@Param('id') id: string): Promise<Astronaut | null> {
    return this.astronautService.getAstronautbyId(id);
  }

  @Post()
  async RecruitAstronaut(@Body() recruit: RecruitAstronautDTO): Promise<Astronaut> {
    const newRecruit: Recruit = {
      firstname: recruit.firstname,
      lastname: recruit.lastname,
    }
    const planetId = recruit.originPlanet.id
    return this.astronautService.recruitAstronaut(newRecruit, planetId);
  }

  @Put(':id')
  async UpdateAstronaut(@Body() updatedAstronaut: Astronaut): Promise<Astronaut> {
    return this.astronautService.updateAstronaut(updatedAstronaut);
  }

  @Delete(':id')
  async fireAstronaut(@Param('id') id: string) {
    return this.astronautService.fireAstronaut(id)
  }

}