import type { Result } from './result.main.class';
import type { ResultError } from './result.error';

export type ResultPromise<V> = Promise<
  Result<V | undefined, ResultError | undefined>
>;
