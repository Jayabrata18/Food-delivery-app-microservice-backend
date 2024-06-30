import { IsNotEmpty, IsString, IsInt, IsNumber } from 'class-validator';

export class OrderItemDto {
    @IsString()
    @IsNotEmpty()
    menuItemId: string;

    @IsInt()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    value: number;
}
