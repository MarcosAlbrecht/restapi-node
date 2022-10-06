import db from '../db';
import User from '../models/user.model';

db

class userRepository {

    async findAllUsers(): Promise<User[]>{
        const query = `
            select uuid, username 
            from application_user
        `;

        const { rows } = await db.query<User>(query)
        return rows || [];
    }

    async findById(uuid: string): Promise<User>{
        const query = `
            select uuid, username 
            from application_user where uuid = $1
        `;

        const values = [uuid];

        const { rows } = await db.query<User>(query, values);
        const [ user ] = rows;
        console.log(user)
        return user;
    }

    async create(user: User): Promise<string>{
        const script = `
            INSERT INTO application_user (
                username,
                password
            )
            VALUES ($1, crypt($2, 'my_salt'))
            RETURNING uuid
        `;

        const values = [user.username, user.password];

        const {rows} = await db.query<{uuid: string}>(script, values);

        const [newUser] = rows;

        return newUser.uuid;
    }

}

export default new userRepository();