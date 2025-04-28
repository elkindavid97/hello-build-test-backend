import pino from 'pino';
import { envs } from '../../config';
const isDevelopment = envs.NODE_ENV === 'development';

export const logger = pino({
  level: isDevelopment ? 'debug' : 'info',
  transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          levelFirst: true,
          translateTime: 'yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname',
          errorLikeObjectKeys: ['err', 'error'],
          messageFormat: '{msg} {stack}',
        },
      }
    : undefined,
  formatters: {
    level(label) {
      return { level: label.toUpperCase() };
    },
  },
});
