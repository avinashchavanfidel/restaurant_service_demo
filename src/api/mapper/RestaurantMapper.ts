import { Builder } from 'builder-pattern';
import { Service } from 'typedi';

import { ProductEntity } from '../entities/ProductEntity';
import { RestaurantEntity } from '../entities/RestaurantEntity';
import { Product, Restaurant } from '../models/RestaurantModel';

@Service()
export class RestaurantMapper {
    public toEntity(restaurant: Restaurant): RestaurantEntity {
        if (restaurant) {
            const restaurantEntity = Builder(RestaurantEntity)
                .name(restaurant.name)
                .pictureUrl(restaurant.pictureUrl)
                .address(restaurant.address)
                .updatedAt(new Date())
                .openWeekDay(restaurant.openWeekDay)
                .closeWeekDay(restaurant.closeWeekDay)
                .openWeekDayTime(restaurant.openWeekDayTime)
                .closeWeekDayTime(restaurant.closeWeekDayTime)
                .openWeekEnd(restaurant.openWeekEnd)
                .CloseWeekEnd(restaurant.CloseWeekEnd)
                .openWeekEndTime(restaurant.openWeekEndTime)
                .closeWeekEndTime(restaurant.closeWeekEndTime)
                .build();

            return restaurantEntity;
        }
        return undefined;
    }

    public toRestaurantDTO(restaurant: RestaurantEntity, products: ProductEntity[]): Restaurant {
        if (restaurant) {
            const restaurantEntity = Builder(Restaurant)
                .id(restaurant.id)
                .name(restaurant.name)
                .pictureUrl(restaurant.pictureUrl)
                .address(restaurant.address)
                .openWeekDay(restaurant.openWeekDay)
                .closeWeekDay(restaurant.closeWeekDay)
                .openWeekDayTime(restaurant.openWeekDayTime)
                .closeWeekDayTime(restaurant.closeWeekDayTime)
                .openWeekEnd(restaurant.openWeekEnd)
                .CloseWeekEnd(restaurant.CloseWeekEnd)
                .openWeekEndTime(restaurant.openWeekEndTime)
                .closeWeekEndTime(restaurant.closeWeekEndTime)
                .products(products)
                .build();
            return restaurantEntity;
        }
        return undefined;
    }

    public toProductEntity(product: Product): ProductEntity {
        if (product) {
            const productEntity = Builder(ProductEntity)
                .restaurantId(product.restaurantId)
                .name(product.name)
                .pictureUrl(product.pictureUrl)
                .price(product.price)
                .category(product.category)
                .build();
            return productEntity;
        }
        return undefined;
    }

}
