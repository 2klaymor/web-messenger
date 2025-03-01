import { eq } from 'drizzle-orm';
import db from '../db.js';
import users from '../schema/user.schema.js';
import bcrypt from 'bcryptjs';


export const findAllUsers = async () => {
    const foundUsers = await db.query.users.findMany();
    
    return foundUsers;
};


export const findUserById = async (id) => {
    const foundUser = await db.query.users.findMany({
        where: eq(users.id, id)
    });

    return foundUser;
}


export const createUser = async (userName: string, password: string) => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const createdUser = await db.insert(users).values({ 
        userName: userName,
        password: hash
     }).returning();

     return createdUser;
};


export const updateUser = async (id: number, userName: string, displayName: string, password: string) => {
    const updatedUser = await db.update(users).set({ 
        userName: userName,
        displayName: displayName,
        password: password
     }).where(eq(users.id, id)).returning();

     return updatedUser;
};


export const deleteUser = async (id) => {
    const deletedUser = await db.delete(users).where(eq(users.id, id));

    return deletedUser;
}