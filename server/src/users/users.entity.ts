export interface UserEntity {
    id: number,
    name: string,
    passwordHash: string,
    displayName: string | null,
    bio: string | null,
    avatar: string | null,
    lastSeen: Date | null,
}