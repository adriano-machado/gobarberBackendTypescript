import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import { isThursday } from 'date-fns';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}
@injectable()
class UpdateProfile {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    old_password,
    password,
    user_id,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User does not exists');
    }
    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);
    if (userWithUpdatedEmail && userWithUpdatedEmail.email !== user_id) {
      throw new AppError('Email already being used');
    }
    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the oldpassword to set a net password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );
      if (!checkOldPassword) {
        throw new AppError('Old password is incorrect');
      }

      user.password = await this.hashProvider.generateHash(password);
    }
    await this.usersRepository.save(user);
    return user;
  }
}

export default UpdateProfile;
