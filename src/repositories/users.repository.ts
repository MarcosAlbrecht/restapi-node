
import db from '../db';
import DatabaseError from '../errors/database.error.model';
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
        try {
            
       
            const query = `
                select uuid, username 
                from application_user where uuid = $1
            `;

            const values = [uuid];

            const { rows } = await db.query<User>(query, values);
            const [ user ] = rows;
            console.log(user)
            return user;
        } catch (error) {
            throw new DatabaseError('Erro na consulta por ID', error); 
        }
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

    async update(user: User): Promise<void>{
        const script = `
            UPDATE application_user 
            SET 
                username = $1,
                password = crypt($2, 'my_salt')
            WHERE uuid = $3
        `;

        const values = [user.username, user.password, user.uuid];

        await db.query<{uuid: string}>(script, values);
        
    }

    async remove(uuid: string): Promise<void>{
        const script = `
            DELETE 
            FROM application_user
            WHERE uuid = $1
        `;

        const values = [uuid];
        await db.query(script, values);
    }

}

export default new userRepository();