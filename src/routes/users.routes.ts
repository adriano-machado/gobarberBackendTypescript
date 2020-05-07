import { Router, response } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRoute = Router();

usersRoute.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });
    delete user.password;
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});
export default usersRoute;
