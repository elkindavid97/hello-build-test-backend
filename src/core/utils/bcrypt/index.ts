import { compare, hash } from 'bcryptjs';

const encrypt = async (password: string): Promise<string> => {
  const passwordHash = await hash(password, 10);
  return passwordHash;
};

const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

export { encrypt, comparePassword };
