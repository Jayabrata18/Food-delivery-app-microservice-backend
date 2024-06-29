import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/create-users.entity';
import { OrderItem } from './orderItem.entity';
import * as crypto from 'crypto';
import { Restaurant } from '../restaurant/create-restrudent.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    orderId: string;

    @BeforeInsert()
    generateOrderId() {
        if (!this.orderId) {
            this.orderId = crypto.randomBytes(5).toString('hex');
        }
    }

    @ManyToOne(() => User, (user: { orders: any; }) => user.orders)
    user: User;

    @ManyToOne(() => Restaurant, (restaurant: { orders: any; }) => restaurant.orders)
    restaurant: Restaurant;

    @OneToMany(() => OrderItem, (orderItem: { order: any; }) => orderItem.order, { cascade: true })
    items: OrderItem[];

    @Column()
    totalValue: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
