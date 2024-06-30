import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Length } from "class-validator";


export class UpdatePriceOfMenuDto {

    @IsNotEmpty()
    @IsString()
    menuItemId: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    menuItemPrice: number;

    @IsString()
    @IsNotEmpty()
    restaurantId: string;

    @IsNotEmpty()
    isAvailable: boolean = true;
}