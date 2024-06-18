import { IsArray, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";


export class CreateRestaurantDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'Name must have atleast 3 characters.' })
    restaurantName: string;

    @IsString()
    @IsNotEmpty()
    restaurantAddress: string;

    @IsNumber()
    @IsNotEmpty()
    pincode: number;

    @IsString()
    @IsNotEmpty()
    restaurantType: string;

    @IsArray()
    menuItems: string[];
}