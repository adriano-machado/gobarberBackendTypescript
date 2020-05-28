import { container } from 'tsyringe';

import IMailTemplateProvider from './models/IMailTemplateProvider';
import HandleBarsMailTemplateProvider from './implementations/HandleBarsMailTemplateProvider';

const providers = {
  handlebars: HandleBarsMailTemplateProvider,
};

// esse tem constructor no provider
container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
