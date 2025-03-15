import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class UpdateUserDto extends PartialType(UserDto) {
    displayName?: string;
    password?: string;
}
