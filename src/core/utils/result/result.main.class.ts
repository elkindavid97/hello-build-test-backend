export class Result<V, E> {
  readonly isSuccess?: V;
  readonly isFailure?: E;

  private constructor(isSuccess?: V, isFailure?: E) {
    this.isSuccess = isSuccess;
    this.isFailure = isFailure;
  }

  static success<V>(value: V): Result<V, undefined> {
    if (value === undefined) {
      throw new Error('Value must not be undefined');
    }
    return new Result(value);
  }

  static failure<E>(error: E): Result<undefined, E> {
    return new Result(undefined, error);
  }
}
