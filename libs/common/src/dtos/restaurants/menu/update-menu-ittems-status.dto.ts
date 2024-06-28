import { IsNotEmpty, IsString, IsDecimal, IsInt, IsOptional, Length, IsUrl, IsNumber } from 'class-validator';

export class UpdateMenuItemStatusDto {

    @IsNotEmpty()
    isAvailable: boolean;
}