import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
    name: string;
    password: string;
}

export class UpdateUserDto {
    displayName?: string;
    password?: string;
}

export class UpdateUserDisplayNameDto extends PartialType(UpdateUserDto) {
    displayName: string;
}

export class CheckUserPasswordDto extends PartialType(UpdateUserDto) {
    password: string;
}

export class AddContactDto {
    targetUserId: number;
    displayName: string | null;
}

export class RemoveContactDto extends PartialType(AddContactDto) {
    targetUserId: number;
}