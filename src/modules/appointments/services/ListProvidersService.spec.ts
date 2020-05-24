// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });
  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'adriano2',
      email: 'adrianoricardom2@gmail.com',
      password: '123456',
    });
    const user2 = await fakeUsersRepository.create({
      name: 'adriano3',
      email: 'adrianoricardom3@gmail.com',
      password: '123456',
    });
    const loggedUser = await fakeUsersRepository.create({
      name: 'adriano',
      email: 'adrianoricardom@gmail.com',
      password: '123456',
    });
    const providers = await listProviders.execute({ user_id: loggedUser.id });
    expect(providers).toEqual([user1, user2]);
  });
});
