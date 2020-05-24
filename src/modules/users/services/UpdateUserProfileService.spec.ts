import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserProfileService from './UpdateUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfileService: UpdateUserProfileService;
describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateUserProfileService = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'adriano',
      email: 'adrianoricardom@gmail.com',
      password: '123456',
    });
    await updateUserProfileService.execute({
      user_id: user.id,
      name: 'adriano2',
      email: 'adriano@adriano.com',
    });
    expect(user.name).toBe('adriano2');
    expect(user.email).toBe('adriano@adriano.com');
  });
  it('should be able to update a non-existing user ', async () => {
    await expect(
      updateUserProfileService.execute({
        user_id: 'non-existing-id',
        name: 'adriano',
        email: 'adriano@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the profile with another user email', async () => {
    await fakeUsersRepository.create({
      name: 'adriano',
      email: 'adrianoricardom@gmail.com',
      password: '123456',
    });

    const updateUser = await fakeUsersRepository.create({
      name: 'adriano2',
      email: 'adrianoricardom2@gmail.com',
      password: '123456',
    });

    await expect(
      updateUserProfileService.execute({
        user_id: updateUser.id,
        name: 'adriano3',
        email: 'adrianoricardom@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'adriano',
      email: 'adrianoricardom@gmail.com',
      password: '123456',
    });
    await updateUserProfileService.execute({
      user_id: user.id,
      name: 'adriano2',
      email: 'adriano@adriano.com',
      old_password: '123456',
      password: '123123',
    });
    expect(user.password).toBe('123123');
  });
  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'adriano',
      email: 'adrianoricardom@gmail.com',
      password: '123456',
    });
    await expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: 'adriano2',
        email: 'adriano@adriano.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'adriano',
      email: 'adrianoricardom@gmail.com',
      password: '123456',
    });
    await expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: 'adriano2',
        email: 'adriano@adriano.com',
        password: '123123',
        old_password: '121212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
