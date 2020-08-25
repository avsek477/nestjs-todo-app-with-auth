import { IsNotEmpty, IsInt, Min, IsNumber, IsDecimal } from "class-validator";

export class CreateItemDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsInt()
    @Min(0)
    qty: number;
    
    @IsNumber()
    @Min(0)
    rate: number;
}