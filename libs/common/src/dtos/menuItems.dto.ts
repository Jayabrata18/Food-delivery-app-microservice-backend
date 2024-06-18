import { IsArray, IsNotEmpty, IsNumber, IsString, Min, MinLength } from "class-validator";
import { Entity } from "typeorm";


@Entity()
export class MenuItems {
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'menuItemName must have atleast 3 characters.' })
    menuItemName: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(10, { message: 'menuItemDescription must have atleast 10 characters.' })
    menuItemDescription: string;
    @IsString()
    @IsNotEmpty()
    menuItemType: string;
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    menuItemPrice: number;
    @IsString()

    menuItemImage: string;
    @IsNumber()
    categoryId: number;

    @IsArray()
    restaurant: string[];


}