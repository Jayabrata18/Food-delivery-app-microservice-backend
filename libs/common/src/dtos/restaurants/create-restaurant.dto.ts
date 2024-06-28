import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MinLength } from "class-validator";


export class CreateRestaurantDto {
    @IsNotEmpty()
    @IsString()
    restaurantName: string;

    @IsNotEmpty()
    @IsString()
    restaurantAddress: string;

    @IsNotEmpty()
    @IsInt()
    pincode: number;

    @IsNotEmpty()
    @IsString()
    restaurantType: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsUrl()
    restaurantPictureUrl?: string;
}