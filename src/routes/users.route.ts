import { Router ,Request, Response, NextFunction } from 'express';
import statusCodes from 'http-status-codes';
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
    const uuid = req.params.uuid;
    const user = await usersRepository.findById(uuid);
    res.status(statusCodes.OK).send(user)
});

usersRoute.post('/users', async (req : Request, res: Response, next : NextFunction) => {
    const newUser = req.body;
    console.log(newUser);

    const uuid = await usersRepository.create(newUser);

    res.status(statusCodes.CREATED).send(uuid);
});

usersRoute.put('/users/:uuid', (req : Request<{ uuid: String }>, res: Response, next : NextFunction) => {
    const uuid = req.params.uuid;
    const modfiedUser = req.body;

    modfiedUser.uuid = uuid;

    res.status(statusCodes.OK).send(modfiedUser);
});

usersRoute.delete('/users/:uuid', (req : Request<{ uuid: String }>, res: Response, next : NextFunction) => {

    res.sendStatus(statusCodes.OK);
});

export default usersRoute;