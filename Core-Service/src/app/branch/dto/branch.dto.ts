import {IsString, IsNotEmpty, IsNumber, IsInt, Min, IsEnum, IsOptional, IsBoolean, MinLength} from "class-validator";
import {Currency} from "../enums";

export class CreateBranchDTO {
    @IsString()
    @IsNotEmpty()
    countryCode!: string;

    @IsString()
    @IsNotEmpty()
    label!: string;

    @IsString()
    @IsNotEmpty()
    addressText!: string;

    @IsNumber()
    lat!: number;

    @IsNumber()
    lng!: number;

    @IsString()
    opensAt!: string;

    @IsString()
    closesAt!: string;

    @IsInt()
    @Min(0)
    deliveryRadius!: number;

    @IsEnum(Currency)
    currency!: Currency
}

export class UpdateBranchDTO {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    countryCode?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    label?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    addressText?: string;

    @IsOptional()
    @IsNumber()
    lat?: number;

    @IsOptional()
    @IsNumber()
    lng?: number;

    @IsOptional()
    @IsString()
    opensAt?: string;

    @IsOptional()
    @IsString()
    closesAt?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    deliveryRadius?: number;

    @IsOptional()
    @IsEnum(Currency)
    currency?: Currency;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsBoolean()
    acceptOrders?: boolean;
}

export class UpdateBranchStatusDTO {
    @IsBoolean()
    isActive!: boolean;
}