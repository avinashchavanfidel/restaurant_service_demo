import { StatusCodes } from 'http-status-codes';
import { ObjectID } from 'mongodb';
import { HttpError } from 'routing-controllers';
import { Inject, Service } from 'typedi';

import { Logger } from '../../decorators/Logger';
import { LoggerInterface } from '../../lib/logger';
import { RestaurantEntity } from '../entities/RestaurantEntity';
import { RestaurantMapper } from '../mapper/RestaurantMapper';
import { Restaurant } from '../models/RestaurantModel';
import { RestaurantRepository } from '../repositories/RestaurantRepository';
import { ProductService } from './ProductService';

@Service()
export class RestaurantService {

    @Inject()
    private restaurantMapper: RestaurantMapper;

    @Inject()
    private productService: ProductService;

    @Inject()
    private restaurantRepo: RestaurantRepository;

    constructor(@Logger(__filename) private logger: LoggerInterface) { }

    public async getRestaurants(): Promise<Restaurant[]> {
        this.logger.info(`get all restaurant`);
        const restaurants: RestaurantEntity[] = await this.restaurantRepo.findAll();
        const resultRestaurants: Restaurant[] = [];
        for (const restaurant of restaurants) {
            resultRestaurants.push(this.restaurantMapper.toRestaurantDTO(restaurant, await this.productService.getProducts(restaurant.id.toString())));
        }
        if (!restaurants) {
            throw new HttpError(StatusCodes.NOT_FOUND, `Restaurant does not exist`);
        }
        return resultRestaurants;
    }

    public async getRestaurant(id: ObjectID): Promise<Restaurant> {
        this.logger.info(`get restaurant for id ${id}`);
        const restaurant: RestaurantEntity = await this.restaurantRepo.findOne(id);
        if (!restaurant) {
            throw new HttpError(StatusCodes.NOT_FOUND, `Restaurant does not exist`);
        }
        const products = await this.productService.getProducts(id.toString());
        return this.restaurantMapper.toRestaurantDTO(restaurant, products);
    }

    public async saveRestaurant(restaurantData: Restaurant): Promise<Restaurant> {
        try {
            this.logger.info(`Got restaurant details to save : ${JSON.stringify(restaurantData)}`);
            // save restaurant details
            const restaurant = await this.restaurantRepo.save(await this.restaurantMapper.toEntity(restaurantData));
            // save product details using restaurantId
            for (const product of restaurantData.products) {
                product.restaurantId = restaurant.id.toString();
                await this.productService.saveProduct(product);
            }
            return this.getRestaurant(restaurant.id);
        } catch (error) {
            this.logger.error(`Failed to insert restaurant, ${JSON.stringify(restaurantData)}`);
            this.logger.error(JSON.stringify(error.message));
            throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    public async updateRestaurant(id: ObjectID, restaurantData: Restaurant): Promise<void> {
        try {
            this.logger.info(`Got restaurant details to update : ${JSON.stringify(restaurantData)}`);
            // save RestaurantService details
            const restaurant: RestaurantEntity = await this.restaurantRepo.findOne(id);
            if (!restaurant) {
                throw new HttpError(StatusCodes.NOT_FOUND, `Restaurant does not exist`);
            } else {
                for (const product of restaurantData.products) {
                    if (product.id) {
                        // syncing the products of the restaurant
                        await this.productService.updateProduct(product, product.id.toString());
                    } else {
                        product.restaurantId = restaurant.id.toString();
                        await this.productService.saveProduct(product);
                    }
                }
                delete restaurantData.id;
                await this.restaurantRepo.update(id, this.restaurantMapper.toEntity(restaurantData));
            }
        } catch (error) {
            this.logger.error(`Failed to insert restaurant, ${JSON.stringify(restaurantData)}`);
            this.logger.error(JSON.stringify(error.message));
            throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    public async deleteRestaurant(id: ObjectID): Promise<RestaurantEntity> {
        try {
            this.logger.info(`Got restaurant id : ${JSON.stringify(id)} to delete`);
            // delete restaurant details
            const restaurant: RestaurantEntity = await this.restaurantRepo.findOne(id);
            if (!restaurant) {
                throw new HttpError(StatusCodes.NOT_FOUND, `Restaurant does not exist`);
            } else {
                const products = await this.productService.getProducts(restaurant.id.toString());
                products.forEach(async product => await this.productService.deleteProduct(product.id.toString()));
                return await this.restaurantRepo.delete(id);
            }
        } catch (error) {
            this.logger.error(`Failed to delete restaurant with id : ${JSON.stringify(id)}`);
            this.logger.error(JSON.stringify(error.message));
            throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    }

}
