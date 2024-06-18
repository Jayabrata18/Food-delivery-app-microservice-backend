import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MenuItems } from "./menuItems.entity";


@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    restaurantId: number;

    @Column({type: 'varchar', length: 455, nullable: false,})
    restaurantName: string;

    @Column({type: 'varchar', length: 455, nullable: false,})
    restaurantAddress: string;

    @Column({type: 'number', nullable: false, })
    pincode: number;

    @Column({type: 'varchar', length: 455, nullable: false,})
    restaurantType: string;
    
    @OneToMany(() => MenuItems, (menuItem) => menuItem.restaurant)
    menuItems: MenuItems[];
    
}