import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRoute = Router();

sessionsRoute.post('/', async (req, res) => {
  const { email, password } = req.body;
  const authenticateUser = new AuthenticateUserService();
  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });
  delete user.password;

  return res.json({ user, token });
});
export default sessionsRoute;
