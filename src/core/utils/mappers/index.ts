import { plainToInstance } from 'class-transformer';

export const toDtoObject = <T extends object>(
  dto: new () => T,
  raw: Record<string, unknown>,
): T => {
  return plainToInstance(dto, raw);
};

export const toDtoArray = <T>(dto: new () => T, raw: Array<Record<string, unknown>>): T[] => {
  return raw.map((item) => plainToInstance(dto, item));
};
