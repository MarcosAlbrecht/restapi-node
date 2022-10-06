import { Router ,Request, Response, NextFunction } from 'express';
import statusCodes from 'http-status-codes';
import DatabaseError from '../errors/database.error.model';
import usersRepository from '../repositories/users.repository';

// get /users
// get /users/:uuid 
// post /users
// put /users/:uuid
// delete /users/:uuid

const usersRoute = Router();

usersRoute.get('/users', async (req : Request, res: Response, next : NextFunction) => {
    const users = await usersRepository.findAllUsers();
    res.status(statusCodes.OK).json(users)
});

usersRoute.get('/users/:uuid', async (req : Request<{ uuid: string }>, res: Response, next : NextFunction) => {
    try {
         
        const uuid = req.params.uuid;
        const user = await usersRepository.findById(uuid);
        res.status(statusCodes.OK).send(user)

    } catch (error) {
        next(error);   
    }
});

usersRoute.post('/users', async (req : Request, res: Response, next : NextFunction) => {
    const newUser = req.body;
    console.log(newUser);

    const uuid = await usersRepository.create(newUser);

    res.status(statusCodes.CREATED).send(uuid);
});

usersRoute.put('/users/:uuid', async (req : Request<{ uuid: String }>, res: Response, next : NextFunction) => {
    const uuid = req.params.uuid;
    const modfiedUser = req.body;

    modfiedUser.uuid = uuid;

    await usersRepository.update(modfiedUser);

    res.status(statusCodes.OK).send();
});

usersRoute.delete('/users/:uuid', async (req : Request<{ uuid: string }>, res: Response, next : NextFunction) => {
    const uuid = req.params.uuid;
    await usersRepository.remove(uuid)
    res.sendStatus(statusCodes.OK);
});

export default usersRoute;