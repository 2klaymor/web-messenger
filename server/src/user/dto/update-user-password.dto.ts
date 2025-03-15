import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class UpdateUserPasswordDto extends PartialType(UserDto) {
  password: string;
}