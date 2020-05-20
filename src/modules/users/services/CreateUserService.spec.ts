import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);
    const user = await createUserService.execute({
      name: 'adriano',
      email: 'adrianoricardom@gmail.com',
      password: '123456',
    });
    expect(user).toHaveProperty('id');
    expect(user.email).toBe('adrianoricardom@gmail.com');
  });

  it('should be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);
    await createUserService.execute({
      name: 'adriano',
      email: 'adrianoricardom@gmail.com',
      password: '123456',
    });
    expect(
      createUserService.execute({
        name: 'adriano',
        email: 'adrianoricardom@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
