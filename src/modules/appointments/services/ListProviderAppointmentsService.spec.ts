// import AppError from '@shared/errors/AppError';

import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderAppointments: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
describe('ListProvidersAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the appointments on specific date', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_test',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_test',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    });
    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
