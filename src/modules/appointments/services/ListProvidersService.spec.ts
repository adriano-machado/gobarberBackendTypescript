// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCache: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeCache = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository, fakeCache);
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
