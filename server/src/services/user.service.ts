import { eq } from 'drizzle-orm';
import db from '../db.js';
import users, { User } from '../schema/user.schema.js';
import { hashPassword, comparePassword } from '../utils/security';


export const findAllUsers = async () => {
    const foundUsers = await db.query.users.findMany();
    
    return foundUsers;
};


export const findUserById = async (user: User) => {
    const foundUser = await db.query.users.findMany({
        where: eq(users.id, user.id)
    });

    return foundUser;
}


export const createUser = async (user: User) => {
    // const salt = await bcrypt.genSalt(); // Генерация соли 
    // const hash = await bcrypt.hash(user.password, salt); // ...и хеша пароля  
    const hashedPassword = await hashPassword(user.password);      

    const createdUser = await db.insert(users).values({ 
        userName: user.userName,
        password: hashedPassword
     }).returning();

     return createdUser;
};


export const updateUser = async (user: User) => {
    const hashedPassword = await hashPassword(user.password);

    const updatedUser = await db.update(users).set({ 
        userName: user.userName,
        displayName: user.displayName,
        password: hashedPassword
     }).where(eq(users.id, user.id)).returning();

     return updatedUser;
};


export const deleteUser = async (user: User) => {
    const deletedUser = await db.delete(users).where(eq(users.id, user.id));

    return deletedUser;
};