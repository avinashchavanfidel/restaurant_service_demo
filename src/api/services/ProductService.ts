import { StatusCodes } from 'http-status-codes';
import { ObjectID } from 'mongodb';
import { HttpError } from 'routing-controllers';
import { Inject, Service } from 'typedi';

import { Logger } from '../../decorators/Logger';
import { LoggerInterface } from '../../lib/logger';
import { ProductEntity } from '../entities/ProductEntity';
import { RestaurantEntity } from '../entities/RestaurantEntity';
import { RestaurantMapper } from '../mapper/RestaurantMapper';
import { Product } from '../models/RestaurantModel';
import { ProductRepository } from '../repositories/ProductRepo';
import { RestaurantRepository } from '../repositories/RestaurantRepository';

@Service()
export class ProductService {

    @Inject()
    private restaurantRepo: RestaurantRepository;

    @Inject()
    private productRepo: ProductRepository;

    @Inject()
    private productMapper: RestaurantMapper;

    constructor(@Logger(__filename) private logger: LoggerInterface) { }

    public async deleteProduct(id: string): Promise<void> {
        this.logger.info(`delete product ${id}`);
        const product: ProductEntity = await this.productRepo.findOne(new ObjectID(id));
        if (!product) {
            throw new HttpError(StatusCodes.NOT_FOUND, `No product found for restaurant`);
        }
        await this.productRepo.delete(new ObjectID(id));
    }

    public async saveProduct(productData: Product): Promise<ProductEntity> {
        this.logger.info(`Got product details to save for : ${JSON.stringify(productData)}`);
        const restaurant: RestaurantEntity = await this.restaurantRepo.findOne(new ObjectID(productData.restaurantId));
        if (!restaurant) {
            throw new HttpError(StatusCodes.NOT_FOUND, `No restaurant found`);
        }
        return await this.productRepo.save(this.productMapper.toProductEntity(productData));
    }

    public async updateProduct(productData: Product, id: string): Promise<ProductEntity> {
        this.logger.info(`Got product details to update for : ${JSON.stringify(productData.id)}`);
        const product: ProductEntity = await this.productRepo.findOne(new ObjectID(id));
        if (!product) {
            throw new HttpError(StatusCodes.NOT_FOUND, `No product found to update`);
        }
        delete productData.id;
        return await this.productRepo.update(new ObjectID(id), productData);
    }

    // Getting products by Restaurant id
    public async getProducts(id: string): Promise<ProductEntity[]> {
        try {
            this.logger.info(`Getting products for restaurantId : ${id}`);
            const restaurant: RestaurantEntity = await this.restaurantRepo.findOne(new ObjectID(id));
            if (!restaurant) {
                throw new HttpError(StatusCodes.NOT_FOUND, `Restaurant does not exist`);
            }
            const result = await this.productRepo.findAll({ where: { restaurantId: { $eq: id } } });
            return result;
        } catch (error) {
            this.logger.error(`Error while getting products`);
            this.logger.error(JSON.stringify(error.message));
            throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error while getting products');
        }
    }

    public async getProduct(id: string): Promise<ProductEntity> {
        try {
            this.logger.info(`Getting product for Id : ${id}`);
            const product: ProductEntity = await this.productRepo.findOne(new ObjectID(id));
            if (!product) {
                throw new HttpError(StatusCodes.NOT_FOUND, `Product does not exist`);
            }
            return product;
        } catch (error) {
            this.logger.error(`Error while getting products`);
            this.logger.error(JSON.stringify(error.message));
            throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error while getting products');
        }
    }
}
