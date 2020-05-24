import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;
describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able to show an user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'adriano',
      email: 'adrianoricardom@gmail.com',
      password: '123456',
    });
    const findUser = await showProfile.execute({ user_id: user.id });
    expect(findUser.id).toBe(user.id);
    expect(findUser.name).toBe(user.name);
    expect(findUser.email).toBe(user.email);
  });
  it('should be able to show a non-existing user ', async () => {
    await expect(
      showProfile.execute({ user_id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
