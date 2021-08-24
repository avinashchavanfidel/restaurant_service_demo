import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ObjectID } from 'typeorm';

export enum WEEKDAYS {
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
}

export enum WEEKENDS {
    SUNDAY = 'SUNDAY',
    SATURDAY = 'SATURDAY',
}

export class Product {
    @IsOptional()
    public id: ObjectID;

    @IsOptional()
    public restaurantId: string;

    @IsString()
    @IsOptional()
    public name: string;

    @IsString()
    @IsOptional()
    public pictureUrl: string;

    @IsString()
    @IsOptional()
    public price: string;

    @IsString()
    @IsOptional()
    public category: string;

}

export class Restaurant {

    @IsOptional()
    public id: ObjectID;

    @IsString()
    @IsOptional()
    public name: string;

    @IsString()
    @IsOptional()
    public pictureUrl: string;

    @IsString()
    @IsOptional()
    public address: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => Product)
    public products: Product[];

    @IsEnum(WEEKDAYS)
    @IsOptional()
    public openWeekDay: WEEKDAYS;

    @IsEnum(WEEKDAYS)
    @IsOptional()
    public closeWeekDay: WEEKDAYS;

    @IsString()
    @IsOptional()
    public openWeekDayTime: string;

    @IsString()
    @IsOptional()
    public closeWeekDayTime: string;

    @IsEnum(WEEKENDS)
    @IsOptional()
    public openWeekEnd: WEEKENDS;

    @IsEnum(WEEKENDS)
    @IsOptional()
    public CloseWeekEnd: WEEKENDS;

    @IsString()
    @IsOptional()
    public openWeekEndTime: string;

    @IsString()
    @IsOptional()
    public closeWeekEndTime: string;

}
