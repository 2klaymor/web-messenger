export class UserDto {
    id: number;
    name: string;
    displayName?: string;
    password: string;
    createdAt: Date;
    lastSeen?: Date;
}