import { Socket as IOSocket } from 'socket.io';
import { UserEntity } from 'src/users/users.entity'

export interface AuthenticatedSocket extends IOSocket {
  user: UserEntity;
}