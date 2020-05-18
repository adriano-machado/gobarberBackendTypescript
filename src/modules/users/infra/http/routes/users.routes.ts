import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const upload = multer(uploadConfig);

const usersRoute = Router();
usersRoute.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const usersRepository = new UsersRepository();

  const createUser = new CreateUserService(usersRepository);
  const user = await createUser.execute({ name, email, password });
  delete user.password;
  return res.json(user);
});

usersRoute.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });
    delete user.password;

    return res.json(user);
  },
);
export default usersRoute;
