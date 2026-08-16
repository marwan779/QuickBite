import {
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
    Min,
    MinLength,
} from "class-validator";


export class CreateProductDTO {

    @IsString()
    @MinLength(1)
    @MaxLength(255)
    name!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    categoryName?: string;
}


export class UpdateProductDTO {

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    categoryName?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    stock?: number;

    @IsOptional()
    @IsBoolean()
    isAvailable?: boolean;
}