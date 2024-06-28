import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Length } from "class-validator";



export class UpdateMenuItemDto {
    @IsNotEmpty()
    @IsString()
    menuItemId: string;

    @IsString()
    @Length(1, 455)
    @IsNotEmpty()
    menuItemName: string;

    @IsString()
    @Length(1, 455)
    @IsNotEmpty()
    menuItemDescription: string;

    @IsString()
    @Length(1, 455)
    @IsNotEmpty()
    menuItemType: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    menuItemPrice: number;

    @IsString()
    @Length(1, 455)
    @IsOptional()
    @IsUrl()
    menuItemImage?: string;

    @IsInt()
    @IsOptional()
    categoryId?: number;

    @IsString()
    @IsNotEmpty()
    restaurantId: string;

    @IsNotEmpty({ default: true })
    isAvailable: boolean;


}