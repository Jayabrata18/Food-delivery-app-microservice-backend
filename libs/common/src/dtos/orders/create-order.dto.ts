import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsArray, ValidateNested } from 'class-validator';
import { OrderItemDto } from './orderItem.dto';

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    restaurantId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

    @IsNumber()
    @IsNotEmpty()
    totalValue: number;
}
