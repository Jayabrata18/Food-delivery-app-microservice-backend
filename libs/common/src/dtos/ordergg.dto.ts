import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateOrderggDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsNumber()
    @IsNotEmpty()
    totalValue: number;

    @IsOptional()
    @IsString()
    orderId?: string;
}
