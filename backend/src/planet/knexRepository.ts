
import knex from "../db";
import Planet from "./entities/Planet";
import PlanetToCreate from "./entities/PlanetToCreate";
import PlanetToUpdate from "./entities/PlanetToUpdate";
import IPlanetRepository from "./interfaces/IPlanetRepository";

export class KnexPlanetRepository implements IPlanetRepository {
    private knexResultToPlanet(knexResult: KnexResult): Planet {
        const { id, name, isHabitable, description, path, imageName } = knexResult;
        return {
            id,
            name,
            isHabitable: !!isHabitable,
            description,
            image: {
                path,
                name: imageName,
            },
        }
    }
    getAll = async (searchPlanet: string | undefined): Promise<Planet[]> => {

        let searhPlanetQuery = knex('planets')
            .select('planets.*', 'images.path', 'images.name as imageName')
            .join('images', 'images.id', '=', 'planets.imageId')
            .where((queryBuilder) => {
                if (searchPlanet) {
                    queryBuilder.where('planets.name', 'like', `%${searchPlanet}%`)
                }
            })
        try {
            const planets = (await searhPlanetQuery)
                .map((knexResult: KnexResult) => this.knexResultToPlanet(knexResult));
            return planets
        } catch (error) {
            throw new Error('internal server error')
        }
    }
    getById = async (id: number): Promise<Planet> => {
        try {
            const knexResult = await knex('planets').where('id', id).first();
            if (knexResult) {
                const updatedPlanet: Planet = this.knexResultToPlanet(knexResult);
                return updatedPlanet

            } else {
                throw new Error("not found.");
            }
        } catch (error) {
            throw new Error("wtf.");
        }
    }

    create = async (planetToCreate: PlanetToCreate): Promise<Planet> => {
        try {
            const imageIdsCreated = await knex('planets').insert(planetToCreate);
            return this.getById(imageIdsCreated[0])

        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    update = async (planetToUpdate: PlanetToUpdate): Promise<Planet> => {
        const { id, ...other } = planetToUpdate;
        try {
            const updatedRows = await knex('planets').where('id', id).update({ ...other });
            if (updatedRows === 0) {
                throw new Error("Method not implemented.");
            }
            return this.getById(planetToUpdate.id)
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    delete = async (id: number): Promise<void> => {
        try {
            const deletedRows = await knex('planets').where('id', id).del();
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
    name: string,
    isHabitable: boolean,
    description: string,
    path: string,
    imageName: string,
}