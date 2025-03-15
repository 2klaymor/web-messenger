import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class UpdateUserDisplayNameDto extends PartialType(UserDto) {
  displayName: string;
}