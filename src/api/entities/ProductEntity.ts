import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'ProductEntity' })
export class ProductEntity {
    @ObjectIdColumn()
    public id: ObjectID;

    @Column()
    public name: string;

    @Column()
    public pictureUrl: string;

    @Column()
    public price: string;

    @Column()
    public restaurantId: string;

    @Column()
    public category: string;
}
