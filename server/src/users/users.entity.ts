export interface UserEntity {
    id: number,
    name: string,
    passwordHash: string,
    displayName: string | null,
    lastSeen: Date | null,
}