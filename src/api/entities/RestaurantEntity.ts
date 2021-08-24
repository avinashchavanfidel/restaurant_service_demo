import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import { WEEKDAYS, WEEKENDS } from '../models/RestaurantModel';

@Entity({ name: 'RestaurantEntity' })
export class RestaurantEntity {

    @ObjectIdColumn()
    public id: ObjectID;

    @Column()
    public name: string;

    @Column()
    public pictureUrl: string;

    @Column()
    public address: string;

    @Column({ type: 'enum', enum: WEEKDAYS })
    public openWeekDay: WEEKDAYS;

    @Column({ type: 'enum', enum: WEEKDAYS })
    public closeWeekDay: WEEKDAYS;

    @Column()
    public openWeekDayTime: string;

    @Column()
    public closeWeekDayTime: string;

    @Column({ type: 'enum', enum: WEEKENDS })
    public openWeekEnd: WEEKENDS;

    @Column({ type: 'enum', enum: WEEKENDS })
    public CloseWeekEnd: WEEKENDS;

    @Column()
    public openWeekEndTime: string;

    @Column()
    public closeWeekEndTime: string;

    @Column()
    public updatedAt: Date;

    @CreateDateColumn()
    public createdAt: Date;
}
