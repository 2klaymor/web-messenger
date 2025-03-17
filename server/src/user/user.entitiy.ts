export interface UserEntity {
    id: number,
    name: string,
    displayName: string | null,
    createdAt: Date,
    lastSeen: Date | null,
}

export interface ContactUserEntity {
    targetUserId: number,
    displayName: string | null,
    isBlocked: boolean,
    isFavorite: boolean,
}