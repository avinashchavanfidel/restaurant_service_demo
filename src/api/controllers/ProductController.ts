import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
    Body, Delete, Get, HttpCode, JsonController, Param, Post, Put, Res
} from 'routing-controllers';
import { Inject } from 'typedi';

import { Product } from '../models/RestaurantModel';
import { ProductService } from '../services/ProductService';

@JsonController()
export class RecordController {

    @Inject()
    private productService: ProductService;

    // Responsible for getting product by Id
    @Get('/product/:id')
    @HttpCode(StatusCodes.OK)
    public async getProduct(@Param('id') id: string, @Res() response: Response): Promise<Response> {
        return response.status(StatusCodes.OK).send(await this.productService.getProduct(id));
    }

    @Put('/product/:id')
    @HttpCode(StatusCodes.CREATED)
    public async updateProduct(@Param('id') id: string, @Body() productData: Product,
                               @Res() response: Response): Promise<Response> {
        return response.status(StatusCodes.CREATED).send(await this.productService.updateProduct(productData, id));
    }

    @Post('/product')
    @HttpCode(StatusCodes.CREATED)
    public async saveProduct(@Body() productData: Product, @Res() response: Response): Promise<Response> {
        return response.status(StatusCodes.CREATED).send(await this.productService.saveProduct(productData));
    }

    @Delete('/product/:id')
    @HttpCode(StatusCodes.ACCEPTED)
    public async deleteProduct(@Param('id') id: string, @Res() response: Response): Promise<Response> {
        await this.productService.deleteProduct(id);
        return response.status(StatusCodes.ACCEPTED).send();
    }

    @Get('/:restaurantId/product')
    @HttpCode(StatusCodes.OK)
    public async getProducts(@Param('restaurantId') restaurantId: string, @Res() response: Response): Promise<Response> {
        return response.status(StatusCodes.OK).send(await this.productService.getProducts(restaurantId));
    }
}
