import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './create-restrudent.entity';
import * as crypto from 'crypto';

@Entity()
export class MenuItems {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    menuItemId: string;

    @BeforeInsert()
    generateMenuItemId() {
        if (!this.menuItemId) {
            this.menuItemId = crypto.randomBytes(5).toString('hex');
        }
    }


    @Column({ type: 'varchar', length: 455, nullable: false })
    menuItemName: string;

    @Column({ type: 'varchar', length: 455, nullable: false })
    menuItemDescription: string;

    @Column({ type: 'varchar', length: 455, nullable: false })
    menuItemType: string;

    @Column({ type: 'decimal', nullable: false })
    menuItemPrice: number;

    @Column({ type: 'varchar', length: 455, nullable: true })
    menuItemImage: string;

    @Column({ type: 'int', nullable: true })
    categoryId: number;

    @ManyToOne(() => Restaurant, restaurant => restaurant.menuItems)
    restaurant: Restaurant;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
