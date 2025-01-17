
import Astronaut from "../entities/Astronaut";
import AstronautToUpdate from "../entities/AstronautToUpdate";
import AstronautToCreate from "../entities/AstronautToCreate";
import IAstronautRepository from "../interfaces/IAstronautRepository";

export class FakeAstronautRepository implements IAstronautRepository {
    public astronauts: Astronaut[] = [
        { id: 1, firstname: 'John', lastname: 'Doe', originPlanet: { id: 1, name: 'Planet 1' } },
        { id: 2, firstname: 'Jane', lastname: 'Smith', originPlanet: { id: 1, name: 'Planet 1' } },
    ];
    getAll = async (): Promise<Astronaut[]> => {
        return Promise.resolve(this.astronauts)
    }
    getById = async (id: number): Promise<Astronaut> => {

        const astronaut: Astronaut | undefined = this.astronauts.find(astronaut => astronaut.id === id)
        if (!astronaut) {
            return Promise.reject(new Error("not found"))
        }
        return Promise.resolve(astronaut)
    }

    create = async (astronautToCreate: AstronautToCreate): Promise<Astronaut> => {
        const newAstronaut = {
            firstname: astronautToCreate.firstname,
            lastname: astronautToCreate.lastname,
            id: this.astronauts.length + 1,
            originPlanet: { id: astronautToCreate.originPlanetid, name: `Planet ${astronautToCreate.originPlanetid}` }
        }
        this.astronauts.push(newAstronaut);
        return Promise.resolve(newAstronaut)
    }
    update = async (astronautToUpdate: AstronautToUpdate): Promise<Astronaut> => {
        const astronaut = this.astronauts.find(a => a.id === astronautToUpdate.id);
        if (!astronaut) {
            return Promise.reject(new Error("not found"))

        }
        astronaut.firstname = astronautToUpdate.firstname;
        astronaut.lastname = astronautToUpdate.lastname;
        astronaut.originPlanet = { id: astronautToUpdate.originPlanetId, name: `Planet ${astronautToUpdate.originPlanetId}` }
        return Promise.resolve(astronaut)
    }
    delete = async (id: number): Promise<void> => {
        const index = this.astronauts.findIndex(a => a.id === 2);
        if (index === -1) {
            return Promise.reject(new Error("not found"))
        }
        this.astronauts = this.astronauts.splice(index, 1);
    }
}
