import { Astronaut } from './Astronaut';
import { AstronautToCreate } from './AstronautToCreate';
import IRecruitAstronautService from './IRecruitAstronautService';

export class RecruitAstronautService implements IRecruitAstronautService {
  recruit = async (astronaut: AstronautToCreate): Promise<Astronaut> => {
    const response = await fetch(`http://${import.meta.env.VITE_API_URL}/astronauts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(astronaut),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

}