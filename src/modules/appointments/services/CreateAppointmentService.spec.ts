import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123123',
      user_id: '122222',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create two appointments on same time', async () => {
    const date = new Date(2020, 4, 10, 11);
    await createAppointmentService.execute({
      date,
      provider_id: '123123',
      user_id: '122222',
    });
    await expect(
      createAppointmentService.execute({
        date,
        provider_id: '123123',
        user_id: '122222',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
