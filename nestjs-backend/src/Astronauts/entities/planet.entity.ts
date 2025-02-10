import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Astronaut } from './astronaut.entity';

@Entity('planets')
export class Planet {
  @ApiProperty({ description: `Planet ID` })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Planet name' })
  @Column()
  name: string;

  @OneToMany(() => Astronaut, (astronaut) => astronaut.originPlanet)
  astronauts: Astronaut[];
} 