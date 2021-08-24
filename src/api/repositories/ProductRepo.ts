import { Service } from 'typedi';
import { getMongoManager, getMongoRepository } from 'typeorm';

import { ProductEntity } from '../entities/ProductEntity';

@Service()
export class ProductRepository {
    public async save(data: ProductEntity): Promise<ProductEntity> {
        return getMongoRepository(ProductEntity).save(data);
    }

    public async findOne(options: any): Promise<ProductEntity> {
        return getMongoRepository(ProductEntity).findOne(options);
    }

    public async findAll(options?: any): Promise<ProductEntity[]> {
        return getMongoManager().find(ProductEntity, options);
    }

    public async update(options: any, data: ProductEntity): Promise<any> {
        return getMongoRepository(ProductEntity).update(options, data);
    }

    public async delete(options: any): Promise<any> {
        return getMongoRepository(ProductEntity).delete(options);
    }

}
