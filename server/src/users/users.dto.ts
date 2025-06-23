import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
    name: string;
    password: string;
}

export class UpdateUserDisplayNameDto {
    displayName: string;
}

export class CheckUserPasswordDto {
    password: string;
}

export class UpdateUserBioDto {
    bio: string;
}