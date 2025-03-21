import { PartialType } from "@nestjs/mapped-types"


export class RegisterUserDto {
    name: string;
    password: string;
}