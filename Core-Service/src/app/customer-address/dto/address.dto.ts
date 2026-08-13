import {
    IsBoolean,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
} from "class-validator";


export enum AddressType {
    OFFICE = "office",
    HOME = "home",
    PUBLIC_PLACE = "public_place",
}


export class CreateCustomerAddressDTO {

    @IsString()
    @MaxLength(100)
    label!: string;

    @IsString()
    @MaxLength(100)
    country!: string;

    @IsString()
    @MaxLength(100)
    city!: string;

    @IsString()
    @MaxLength(255)
    street!: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    building?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    apartmentNumber?: string;

    @IsEnum(AddressType)
    type!: AddressType;

    @IsNumber()
    lat!: number;

    @IsNumber()
    lng!: number;

    @IsBoolean()
    isDefault!: boolean;
}


export class UpdateCustomerAddressDTO {

    @IsOptional()
    @IsString()
    @MaxLength(100)
    label?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    country?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    city?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    street?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    building?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    apartmentNumber?: string;

    @IsOptional()
    @IsEnum(AddressType)
    type?: AddressType;

    @IsOptional()
    @IsNumber()
    lat?: number;

    @IsOptional()
    @IsNumber()
    lng?: number;

    @IsOptional()
    @IsBoolean()
    isDefault?: boolean;
}