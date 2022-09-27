import db from '../db';
import User from '../models/user.model';

db

class userRepository {

    async findAllUsers(): Promise<User[]>{
        const query = `
            select uuid, username 
            from application_user
        `;

        const result = await db.query<User>(query)
        const rows = result.rows;
        return rows || [];
    }

}

export default new userRepository();