import { PartialType } from "@nestjs/mapped-types"


export class RegisterUserDto {
    name: string;
    password: string;
}

export class LoginUserDto extends PartialType(RegisterUserDto) {
    name: string;
    password: string;
}