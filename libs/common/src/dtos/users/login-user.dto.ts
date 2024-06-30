import { ArrayNotEmpty, IsArray, IsBoolean, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

// const passwordRegEx =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class LoginUserDto {

 

    @IsEmail({}, { message: 'Please provide valid Email.' })
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    // @Matches(passwordRegEx, {
    //   message: `Password must contain Minimum 8 and maximum 20 characters,
    //   at least one uppercase letter,
    //   one lowercase letter,
    //   one number and
    //   one special character`,
    // })
    password: string;

    // @IsBoolean()
    // isActive: boolean;

    // @IsArray()
    // @ArrayNotEmpty()
    // roles: string[];

}