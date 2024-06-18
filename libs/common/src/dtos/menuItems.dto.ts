import { IsNotEmpty, IsString, IsDecimal, IsInt } from 'class-validator';

export class CreateMenuItemDto {
    @IsNotEmpty()
    @IsString()
    menuItemName: string;

    @IsNotEmpty()
    @IsString()
    menuItemDescription: string;

    @IsNotEmpty()
    @IsString()
    menuItemType: string;

    @IsNotEmpty()
    @IsDecimal()
    menuItemPrice: number;

    @IsNotEmpty()
    @IsInt()
    restaurantId: number; // Assuming this is the ID of the associated restaurant
}
