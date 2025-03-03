import { integer, varchar, char } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';


export interface User {
    id: number,
    userName: string,
    displayName?: string,
    password: string
}


const users = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userName: varchar({ length: 25 }).notNull().unique(),
    displayName: varchar({ length: 25 }),
    password: char({ length: 60 }).notNull()
});

export default users;