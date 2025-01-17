
import Astronaut from "../entities/Astronaut";
import AstronautToUpdate from "../entities/AstronautToUpdate";
import AstronautToCreate from "../entities/AstronautToCreate";
import IAstronautRepository from "../interfaces/IAstronautRepository";
import NotFoundError from "../../common/notFoundError";
import UnexpectedError from "../../common/unexpectedError";

export class FakeAstronautRepository implements IAstronautRepository {
    constructor(private readonly error: boolean = false) {
    }
    public astronauts: Astronaut[] = [
        { id: 1, firstname: 'John', lastname: 'Doe', originPlanet: { id: 1, name: 'Planet 1' } },
        { id: 2, firstname: 'Jane', lastname: 'Smith', originPlanet: { id: 1, name: 'Planet 1' } },
    ];
    getAll = async (): Promise<Astronaut[]> => {
        if (this.error) {
            return Promise.reject(new UnexpectedError('database error'))
        }
        return Promise.resolve(this.astronauts)
    }
    getById = async (id: number): Promise<Astronaut> => {
        if (this.error) {
            return Promise.reject(new UnexpectedError('database error'))
        }
        const astronaut: Astronaut | undefined = this.astronauts.find(astronaut => astronaut.id === id)
        if (!astronaut) {
            return Promise.reject(new NotFoundError('astronaut not found'))
        }
        return Promise.resolve(astronaut)
    }

    create = async (astronautToCreate: AstronautToCreate): Promise<Astronaut> => {
        if (this.error) {
            return Promise.reject(new UnexpectedError('database error'))
        }
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
        if (this.error) {
            return Promise.reject(new UnexpectedError('database error'))
        }
        const astronaut = this.astronauts.find(a => a.id === astronautToUpdate.id);
        if (!astronaut) {
            return Promise.reject(new NotFoundError('astronaut not found'))

        }
        astronaut.firstname = astronautToUpdate.firstname;
        astronaut.lastname = astronautToUpdate.lastname;
        astronaut.originPlanet = { id: astronautToUpdate.originPlanetId, name: `Planet ${astronautToUpdate.originPlanetId}` }
        return Promise.resolve(astronaut)
    }
    delete = async (id: number): Promise<void> => {
        if (this.error) {
            return Promise.reject(new UnexpectedError('database error'))
        }
        const index = this.astronauts.findIndex(a => a.id === id);
        if (index === -1) {
            return Promise.reject(new NotFoundError('astronaut not found'))
        }
        this.astronauts.splice(index, 1);
    }
}
