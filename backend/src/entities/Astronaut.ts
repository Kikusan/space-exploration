import Planet from './Planet';

interface Astronaut {
  id: number;
  firstname: string;
  lastname: string;
  originPlanetId: Planet;
}

export default Astronaut;
