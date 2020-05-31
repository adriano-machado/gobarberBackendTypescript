import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';
  config: {
    redis: RedisOptions;
  };
}
export default {
  driver: 'redis',
  config: {
    redis: {
      host: '127.0.0.1',
      port: 32770,
      password: undefined,
    },
  },
} as ICacheConfig;
