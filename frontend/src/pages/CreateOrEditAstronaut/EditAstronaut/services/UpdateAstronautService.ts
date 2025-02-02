import { Astronaut } from './Astronaut';
import { AstronautToUpdate } from './AstronautToUpdate';
import IUpdateAstronautService from './IUpdateAstronautService';

export class UpdateAstronautService implements IUpdateAstronautService {
  update = async (astronaut: AstronautToUpdate): Promise<Astronaut> => {
    const response = await fetch(`http://${import.meta.env.VITE_API_URL}/astronauts/${astronaut.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(astronaut),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  getById = async (id: number): Promise<Astronaut> => {
    const response = await fetch(`http://${import.meta.env.VITE_API_URL}/astronauts/${id}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };
}