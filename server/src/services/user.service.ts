import db from './prisma.service';
import User from '../dto/user.dto';
import { hashPassword, comparePassword } from '../utils/security';


export const getAllUsers = async () => {
    const foundUsers = await db.user.findMany();
    return foundUsers;
}

export const getUserById = async (user: User) => {
    const foundUser = await db.user.findUnique({
        where: {
            id: user.id
        }
    });
    return foundUser;
}

export const createUser = async (user: User) => {
    const hashedPassword = await hashPassword(user.password);
    const createdUser = await db.user.create({
        data: {
            name: user.name,
            passwordHash: hashedPassword
        }
    });
    return createdUser;
}

export const updateUser = async (user: User) => {
    const hashedPassword = await hashPassword(user.password);
    const updatedUser = await db.user.update({
        where: {
            id: user.id
        },
        data: {
            name: user.name,
            displayName: user.displayName,
            passwordHash: hashedPassword
        }
    });
    return updatedUser;
}

export const deleteUser = async (user: User) => {
    const deletedUser = await db.user.delete({
        where: {
            id: user.id
        }
    });
};
    

























// export const findAllUsers = async () => {
//     const foundUsers = await db.query.users.findMany();

//     return foundUsers;
// };


// export const findUserById = async (user: User) => {
//     const foundUser = await db.query.users.findMany({
//         where: eq(users.id, user.id)
//     });

//     return foundUser;
// }


// export const createUser = async (user: User) => {
//     const hashedPassword = await hashPassword(user.password_hash);

//     const createdUser = await db.insert(users).values({
//         userName: user.userName,
//         password_hash: hashedPassword
//      }).returning();

//      return createdUser;
// };


// export const updateUser = async (user: User) => {
//     const hashedPassword = await hashPassword(user.password_hash);

//     const updatedUser = await db.update(users).set({
//         userName: user.userName,
//         displayName: user.displayName,
//         password_hash: hashedPassword
//      }).where(eq(users.id, user.id)).returning();

//      return updatedUser;
// };


// export const deleteUser = async (user: User) => {
//     const deletedUser = await db.delete(users).where(
//         eq(users.id, user.id)
//     ).returning();

//     return deletedUser;
// };