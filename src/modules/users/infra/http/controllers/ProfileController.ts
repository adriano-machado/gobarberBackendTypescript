import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class UsersController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute({ user_id });
    return res.json(classToClass(user));

    // exibir perfil
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, email, password, old_password } = req.body;

    const updateProfile = container.resolve(UpdateUserProfileService);
    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });
    return res.json(classToClass(user));
  }
}
