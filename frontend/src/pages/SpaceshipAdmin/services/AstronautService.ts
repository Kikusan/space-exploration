import { Astronaut } from '@api/astronaut.api';
import IFetchAstronautService from './IFetchAstronautService';

export class AstronautService implements IFetchAstronautService {
  fetchAstronauts = async () => {
    const response = await fetch(`http://${import.meta.env.VITE_API_URL}/astronuts`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  deleteAstronaut = async (id: number): Promise<Astronaut[]> => {
    const response = await fetch(`http://${import.meta.env.VITE_API_URL}/astronauts/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('deletion failed');
    return this.fetchAstronauts();
  };
}