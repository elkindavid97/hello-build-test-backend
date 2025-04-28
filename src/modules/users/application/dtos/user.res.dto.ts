import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  password!: string;

  @Expose()
  isActive!: boolean;

  @Expose()
  githubToken!: string | null;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}
