
import Astronaut from "./entities/Astronaut";
import AstronautToUpdate from "./entities/AstronautToUpdate";
import AstronautToCreate from "./entities/AstronautToCreate";
import IAstronautRepository from "./interface/IAstronautRepository";
import knex from "../db";

export class KnexAstronautRepository implements IAstronautRepository {
    private knexResultToAstronaut(knexResult: KnexResult): Astronaut {
        const { id, firstname, lastname, name, planetId } = knexResult;
        return {
            id,
            firstname,
            lastname,
            originPlanet: {
                name,
                id: planetId,
            },
        }
    }
    getAll = async (): Promise<Astronaut[]> => {
        try {
            const astronauts: Astronaut[] = (await knex('astronauts')
                .select('astronauts.*', 'planets.name', 'planets.id as planetId')
                .join('planets', 'planets.id', '=', 'astronauts.originPlanetId')
                .join('images', 'images.id', '=', 'planets.imageId'))
                .map((knexResult: KnexResult) => this.knexResultToAstronaut(knexResult));
            return astronauts
        } catch (error) {
            throw new Error('internal server error')
        }
    }
    getById = async (id: number): Promise<Astronaut> => {
        try {
            const knexResult = await knex('astronauts').select('astronauts.*', 'planets.name', 'planets.id as planetId')
                .join('planets', 'planets.id', '=', 'astronauts.originPlanetId')
                .where('astronauts.id', id).first();
            if (knexResult) {
                const updatedAstronaut: Astronaut = this.knexResultToAstronaut(knexResult);
                return updatedAstronaut

            } else {
                throw new Error("not found.");
            }

        } catch (error) {
            throw new Error("wtf.");
        }
    }

    create = async (astronautToCreate: AstronautToCreate): Promise<Astronaut> => {
        try {
            const astronautCreated = await knex.insert(astronautToCreate).into('astronauts');
            return this.getById(astronautCreated[0])

        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    update = async (astronautToUpdate: AstronautToUpdate): Promise<Astronaut> => {
        const { id, firstname, lastname, originPlanetId } = astronautToUpdate;
        try {
            const updatedRows = await knex('astronauts').where('id', id).update({ firstname, lastname, originPlanetId });
            if (updatedRows === 0) {
                throw new Error("Method not implemented.");
            }
            return this.getById(astronautToUpdate.id)
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    delete = async (id: number): Promise<void> => {
        try {
            const deletedRows = await knex('astronauts').where('id', id).del();
            if (deletedRows === 0) {
                throw new Error("Method not implemented.");

            }
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
}



interface KnexResult {
    id: number;
    firstname: string;
    lastname: string;
    name: string;
    planetId: number;

}