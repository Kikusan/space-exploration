import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Planet } from './planet.entity';

@Entity('astronauts')
export class Astronaut {
  @ApiProperty({ description: `Astronaut ID` })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Astronaut firstname' })
  @Column()
  firstname: string;

  @ApiProperty({ description: 'Astronaut lastname' })
  @Column()
  lastname: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Planet, (planet) => planet.astronauts, { nullable: false, eager: true })
  @JoinColumn({ name: 'originPlanetId' })
  originPlanet: Planet;
} 