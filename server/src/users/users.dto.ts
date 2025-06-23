import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
    name: string;
    password: string;
}

export class UpdateUserDisplayNameDto {
    displayName: string;
}

export class UpdateUserPasswordDto {
    oldPassword: string;
    password: string;
}

export class UpdateUserBioDto {
    bio: string;
}