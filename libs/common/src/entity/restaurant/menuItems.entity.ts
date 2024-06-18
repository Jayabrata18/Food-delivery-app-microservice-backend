import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "./create-restrudent.entity";



@Entity()
export class MenuItems {
    @PrimaryGeneratedColumn()
    menuItemId: number;

    @Column({ type: 'varchar', length: 455, nullable: false, })
    menuItemName: string;

    @Column({ type: 'varchar', length: 455, nullable: false, })
    menuItemDescription: string;

    @Column({ type: 'varchar', length: 455, nullable: false, })
    menuItemType: string;

    @Column({ type: 'decimal', nullable: false, })
    menuItemPrice: number;

    @Column({ type: 'varchar', length: 455, nullable: true, })
    menuItemImage: string;

    @Column({ type: 'number', nullable: true, })
    categoryId: number;

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.menuItems)
    restaurant: Restaurant;

    @Column('date', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column('date', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

}