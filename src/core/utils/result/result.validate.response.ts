import type { Response } from 'express';
import type { Result, ResultError } from './';

function handleResult<V, E extends ResultError | undefined>(
  res: Response,
  result: Result<V, E>,
  successfulStatus = 200,
  successMessage?: string,
): void {
  if (result.isFailure) {
    const codeError = result.isFailure.code ?? 500;
    res.status(codeError).json({ error: result.isFailure.message });
  } else {
    if (successMessage) {
      res.status(successfulStatus).json({ message: successMessage });
    } else {
      res.status(successfulStatus).json(result.isSuccess);
    }
  }
}

export { handleResult };
