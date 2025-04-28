import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserLoginResDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  token!: string;

  @Expose()
  githubToken!: string | null;
}
