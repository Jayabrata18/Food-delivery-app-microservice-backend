import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MenuItems } from "./menuItems.entity";
import { Order } from "../orders/order.entity";
import * as crypto from 'crypto';


@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    restaurantId: string;

    @BeforeInsert()
    generateRestaurantId() {
        if (!this.restaurantId) {
            this.restaurantId = crypto.randomBytes(5).toString('hex');
        }
    }

    @Column({ type: 'varchar', length: 455, nullable: false, })
    restaurantName: string;

    @Column({ type: 'varchar', length: 455, nullable: false, })
    restaurantAddress: string;

    @Column({ type: 'number', nullable: false, })
    pincode: number;

    @Column({ type: 'varchar', length: 455, nullable: false, })
    restaurantType: string;

    @OneToMany(() => MenuItems, (menuItem) => menuItem.menuItemId)
    menuItems: MenuItems[];

    @OneToMany(() => Order, order => order.restaurant)
    orders: Order[];

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: true })
    restaurantPictureUrl: string;

    @Column('date', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column('date', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

}