import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import UserRepository from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  token: string;
  password: string;
}
@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findyByToken(token);
    if (!userToken) {
      throw new AppError("UserToken doens't exists");
    }
    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError("User doens't exists");
    }

    user.password = password;
    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
