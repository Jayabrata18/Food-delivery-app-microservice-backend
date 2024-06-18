import { PrimaryGeneratedColumn, Column, Entity, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Order } from '../orders/order.entity';
@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false, })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false, })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false, })
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
    @Column({ unique: true })
    userId: string;

    @BeforeInsert()
    generateUserId() {
        if (!this.userId) {
            this.userId = crypto.randomBytes(5).toString('hex');
        }
    }

    @Column({ nullable: true, })
    avatar?: string;

    @Column({ type: 'varchar', default: "asdf-qwer-zxcv-mnbv" })
    apikey: string;

    @Column({ nullable: true })
    phoneNumber?: string;

    @Column({ default: 'user' })
    role: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'date', nullable: true })
    dateOfBirth: Date;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    profilePictureUrl: string;

    @OneToMany(() => Order, order => order.user)
    orders: Order[];

    @Column('date', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column('date', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}