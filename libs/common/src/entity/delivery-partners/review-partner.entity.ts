import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DeliveryPartner } from './delivery-partners.entity';

@Entity({name: 'delivery_partner_reviews'})
export class DeliveryPartnerReview {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    reviewerName: string;

    @Column({ type: 'text', nullable: false })
    content: string;

    @Column('decimal', { precision: 2, scale: 1 })
    rating: number;

    @ManyToOne(() => DeliveryPartner, deliveryPartner => deliveryPartner.reviews)
    deliveryPartner: DeliveryPartner;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}