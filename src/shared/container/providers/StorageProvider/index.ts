import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvider,
};

// esse tem constructor no provider
container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.disk,
);
