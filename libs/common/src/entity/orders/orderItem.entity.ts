import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { MenuItems } from '../restaurant/menuItems.entity';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.items)
    order: Order;

    @ManyToOne(() => MenuItems, menuItem => menuItem.menuItemId)
    menuItem: MenuItems;

    @Column()
    quantity: number;

    @Column()
    value: number;
}
