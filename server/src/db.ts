import { drizzle } from 'drizzle-orm/pglite';
import users from './schema/user.schema.js';


const db = drizzle({ 
        connection: { 
            dataDir: process.env.DATABASE_PATH || './pgdata/' 
        }, 
        casing: 'snake_case',
        schema: {
            users
        }
});

// const createDbAtFirstTime = async (db) => {
//     db.execute(`CREATE TABLE "users" (
// 	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
// 	"userName" varchar(25) NOT NULL,
// 	"displayName" varchar(25),
// 	"password" char(60) NOT NULL,
// 	CONSTRAINT "users_userName_unique" UNIQUE("userName")
// );`)
// };


export default db;