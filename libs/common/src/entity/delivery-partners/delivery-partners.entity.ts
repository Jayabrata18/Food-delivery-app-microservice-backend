

import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { DeliveryPartnerReview } from './review-partner.entity';
import { Order } from '../orders/order.entity';

@Entity({ name: 'delivery_partners' })
export class DeliveryPartner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @Column({ unique: true })
    partnerId: string;

    @BeforeInsert()
    generatePartnerId() {
        if (!this.partnerId) {
            this.partnerId = crypto.randomBytes(5).toString('hex');
        }
    }

    @Column({ type: 'varchar', length: 15, nullable: false })
    phone: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    city: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    country: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    address: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    vehicleType?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    vehicleNumber?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    vehicleModel?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    bankName?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    accountNumber?: string;

    @Column({ type: 'varchar', length: 11, nullable: true })
    ifscCode?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    branchName?: string;

    @Column({ type: 'varchar', length: 12, nullable: true })
    aadharNumber?: string;

    @Column({ type: 'varchar', length: 10, nullable: true })
    panNumber?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    backgroundCheck?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    policeVerification?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    profilePicture?: string;

    @Column({ type: 'varchar', default: "asdf-qwer-zxcv-mnbv" })
    apikey: string;

    @Column({ default: true })
    isActive: boolean;

    @Column('decimal', { default: 0 })
    totalIncome: number;

    @OneToMany(() => Order, order => order.deliveryPartner)
    allOrders: Order[];

    @OneToMany(() => DeliveryPartnerReview, review => review.deliveryPartner)
    reviews: DeliveryPartnerReview[];

    @Column('decimal', { default: 0, precision: 2, scale: 1 })
    averageRating: number;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
