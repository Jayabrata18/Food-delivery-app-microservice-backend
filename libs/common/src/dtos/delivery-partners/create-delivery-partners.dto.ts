import { IsNotEmpty, IsString } from "class-validator";


export class DeliveryPartnerDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    vehicleType: string;

    @IsString()
    vehicleNumber: string;

    @IsString()
    vehicleModel: string;

    @IsString()
    bankName: string;

    @IsString()
    accountNumber: string;

    @IsString()
    ifscCode: string;

    @IsString()
    branchName: string;

    @IsString()
    aadharNumber: string;

    @IsString()
    panNumber: string;


    @IsString()
    backgroundCheck: string;

    @IsString()
    policeVerification: string;

    @IsString()
    profilePicture: string;

}