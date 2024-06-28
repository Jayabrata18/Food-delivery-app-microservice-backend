import { ArrayNotEmpty, IsArray, IsBoolean, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class UpdateOrderStatusDto {
    @IsNotEmpty()
    @IsString()
    status: string;
}