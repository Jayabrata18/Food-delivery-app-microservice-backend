import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/create-users.entity';
import * as crypto from 'crypto';



@Entity()
export class Ordergg {
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

    // @ManyToOne(() => User, user => user.orders)
    // user: User;

    @Column({ unique: true })
    userId: string;

    @Column()
    totalValue: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}