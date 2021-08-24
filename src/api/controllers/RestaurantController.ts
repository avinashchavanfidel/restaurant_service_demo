import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
    Body, Delete, Get, HttpCode, JsonController, Param, Post, Put, Res
} from 'routing-controllers';
import { Inject } from 'typedi';
import { ObjectID } from 'typeorm';

import { Restaurant } from '../models/RestaurantModel';
import { RestaurantService } from '../services/RestaurantService';

@JsonController()
export class RestaurantController {

    @Inject()
    private restaurantService: RestaurantService;

    // Responsible for getting all the restaurants
    @Get()
    @HttpCode(StatusCodes.OK)
    public async getRestaurants( @Res() response: Response): Promise<Response> {
        return response.status(StatusCodes.OK).send(await this.restaurantService.getRestaurants());
    }

    @Get('/:id')
    @HttpCode(StatusCodes.OK)
    public async getRestaurant(@Param('id') id: ObjectID, @Res() response: Response): Promise<Response> {
        return response.status(StatusCodes.OK).send(await this.restaurantService.getRestaurant(id));
    }

    @Post()
    @HttpCode(StatusCodes.CREATED)
    public async saveRestaurant(@Body() restaurantData: Restaurant, @Res() response: Response): Promise<Response> {
        return response.status(StatusCodes.CREATED).send(await this.restaurantService.saveRestaurant(restaurantData));
    }

    @Put('/:id')
    @HttpCode(StatusCodes.OK)
    public async updateRestaurant(@Body() restaurantData: Restaurant, @Param('id') id: ObjectID, @Res() response: Response): Promise<Response> {
        await this.restaurantService.updateRestaurant(id, restaurantData);
        return response.status(StatusCodes.OK).send();
    }

    @Delete('/:id')
    @HttpCode(StatusCodes.OK)
    public async deleteRestaurant(@Param('id') id: ObjectID, @Res() response: Response): Promise<Response> {
        await this.restaurantService.deleteRestaurant(id);
        return response.status(StatusCodes.OK).send();
    }
}
