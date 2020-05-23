import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'adriano',
      email: 'adrianoricardom@gmail.com',
      password: '123456',
    });
    expect(user).toHaveProperty('id');
    expect(user.email).toBe('adrianoricardom@gmail.com');
  });

  it('should be able to create a new user with same email from another', async () => {
    await createUserService.execute({
      name: 'adriano',
      email: 'adrianoricardom@gmail.com',
      password: '123456',
    });
    await expect(
      createUserService.execute({
        name: 'adriano',
        email: 'adrianoricardom@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
