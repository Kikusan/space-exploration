import { Planet } from '@api/planet.api';
import IPlanetService from './IPlanetService';

export class FakePlanetService implements IPlanetService {
  readonly planets: Planet[] = [
    {
      'id': 1,
      'name': 'Donut Factory',
      'isHabitable': true,
      'description': 'Forte en calories',
      'image': {
        'path': '/assets/donut_factory.jpg',
        'name': 'Donut Factory Image',
      },
    },
    {
      'id': 11,
      'name': 'pouloulou',
      'isHabitable': false,
      'description': 'description 4',
      'image': {
        'path': '/assets/donut_factory.jpg',
        'name': 'Donut Factory Image',
      },
    },
    {
      'id': 2,
      'name': 'Duck Invaders',
      'isHabitable': true,
      'description': 'La danse ici est une religion',
      'image': {
        'path': '/assets/duck_invaders.jpg',
        'name': 'Duck Invaders Image',
      },
    },
    {
      'id': 3,
      'name': 'Raccoon from Asgard',
      'isHabitable': true,
      'description': 'Espiegle mais pas trop',
      'image': {
        'path': '/assets/raccoon_asgards.jpg',
        'name': 'Raccoon from Asgard Image',
      },
    },
    {
      'id': 8,
      'name': 'Kikusan world',
      'isHabitable': true,
      'description': null,
      'image': {
        'path': '/assets/raccoon_asgards.jpg',
        'name': 'Raccoon from Asgard Image',
      },
    },
    {
      'id': 4,
      'name': 'Schizo Cats',
      'isHabitable': true,
      'description': 'Non leur planete n\'est pas une pelote',
      'image': {
        'path': '/assets/schizo_cats.jpg',
        'name': 'Schizo Cats Image',
      },
    },
  ];

  fetchPlanets = () => Promise.resolve(this.planets);
}
