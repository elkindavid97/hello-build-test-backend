import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserByEmailLoginResDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  password!: string;

  @Expose()
  githubToken!: string | null;
}
