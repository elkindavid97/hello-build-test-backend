import 'express';

declare module 'express-serve-static-core' {
  export interface Request {
    user: {
      id: string;
      email: string;
      name: string;
      githubToken: string | null;
    };
  }
}
