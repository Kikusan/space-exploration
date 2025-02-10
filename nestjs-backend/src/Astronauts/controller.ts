import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AstronautService } from './service';
import { ApiTags } from '@nestjs/swagger';
import { Astronaut } from './entities/astronaut.entity';

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
  async RecruitAstronaut(@Body() recruit: Astronaut): Promise<Astronaut> {
    return this.astronautService.recruitAstronaut(recruit);
  }

  @Put(':id')
  async UpdateAstronaut(@Body() updatedAstronaut: Astronaut): Promise<Astronaut> {
    return this.astronautService.recruitAstronaut(updatedAstronaut);
  }

}