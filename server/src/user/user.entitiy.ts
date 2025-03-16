export interface UserEntity {
    id: number,
    name: string,
    displayName: string | null,
    createdAt: Date,
    lastSeen: Date | null,
}