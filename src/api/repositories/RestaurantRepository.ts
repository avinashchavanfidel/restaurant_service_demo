import { Service } from 'typedi';
import { getMongoManager, getMongoRepository } from 'typeorm';

import { RestaurantEntity } from '../entities/RestaurantEntity';

@Service()
export class RestaurantRepository {
    public async save(data: RestaurantEntity): Promise<RestaurantEntity> {
        return getMongoRepository(RestaurantEntity).save(data);
    }

    public async findOne(options: any): Promise<RestaurantEntity> {
        return getMongoRepository(RestaurantEntity).findOne(options);
    }

    public async findAll(options?: any): Promise<RestaurantEntity[]> {
        return getMongoManager().find(RestaurantEntity, options);
    }

    public async update(data: RestaurantEntity, options: any): Promise<any> {
        return getMongoRepository(RestaurantEntity).update(data, options);
    }

    public async delete(options: any): Promise<any> {
        return getMongoRepository(RestaurantEntity).delete(options);
    }

}
