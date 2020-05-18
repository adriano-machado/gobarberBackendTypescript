import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

const upload = multer(uploadConfig);

const usersRoute = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

usersRoute.post('/', usersController.create);

usersRoute.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);
export default usersRoute;
