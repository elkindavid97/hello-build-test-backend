import 'dotenv/config';
import { get } from 'env-var';

const DB_USER = get('DB_USER').required().asString();
const DB_PASSWORD = get('DB_PASSWORD').required().asString();
const DB_HOST = get('DB_HOST').required().asString();
const DB_PORT = get('DB_PORT').required().asPortNumber();
const DB_NAME = get('DB_NAME').required().asString();

export const envs = {
  NODE_ENV: get('NODE_ENV').required().asString(),
  PORT: get('PORT').required().asPortNumber(),
  DATABASE_URL: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  JWT_SECRET: get('JWT_SECRET').required().asString(),
  FRONTEND_URL: get('FRONTEND_URL').required().asString(),
  GITHUB_CLIENT_ID: get('GITHUB_CLIENT_ID').required().asString(),
  GITHUB_CLIENT_SECRET: get('GITHUB_CLIENT_SECRET').required().asString(),
};
