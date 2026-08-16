import { IsString, IsNotEmpty, IsOptional, IsEnum, MinLength, IsUrl } from "class-validator";
import { RestaurantStatus } from "../enums";

export class CreateRestaurantDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    name!: string;

    @IsOptional()
    @IsUrl()
    logoURL?: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    primaryCountry!: string;
}

export class UpdateRestaurantDTO {
    @IsOptional()
    @IsString()
    @MinLength(1)
    name?: string;

    @IsOptional()
    @IsUrl()
    logoURL?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    primaryCountry?: string;
}

export class UpdateRestaurantStatusDTO {
    @IsEnum(RestaurantStatus)
    status!: RestaurantStatus;
}