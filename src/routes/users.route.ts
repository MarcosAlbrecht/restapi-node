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

usersRoute.get('/users/:uuid', (req : Request<{ uuid: String }>, res: Response, next : NextFunction) => {
    const uuid = req.params.uuid;
    res.status(statusCodes.OK).send({ uuid })
});

usersRoute.post('/users', (req : Request, res: Response, next : NextFunction) => {
    const newUser = req.body;
    console.log(newUser);
    res.status(statusCodes.CREATED).send(newUser);
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