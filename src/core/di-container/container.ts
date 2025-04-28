import * as awilix from 'awilix';
import { db } from '../../db';
import { GithubReposService } from '../../modules/githubRepos/application/github.repos.service';
import { GithubReposController } from '../../modules/githubRepos/infrastructure/http/github.repos.controller';
import { GithubRepositoryAPI } from '../../modules/githubRepos/infrastructure/persistence/github.repository.api';
import { UsersRepositoryPostgres } from '../../modules/users/infrastructure/persistence/user.repository.postgres';
import { UsersService } from './../../modules/users/application/user.service';
import { UsersController } from './../../modules/users/infrastructure/http/user.controller';
const container = awilix.createContainer();

container.register({
  db: awilix.asValue(db),
  usersController: awilix.asClass(UsersController),
  usersService: awilix.asClass(UsersService),
  usersRepository: awilix.asClass(UsersRepositoryPostgres),

  githubReposController: awilix.asClass(GithubReposController),
  githubReposService: awilix.asClass(GithubReposService),
  githubRepository: awilix.asClass(GithubRepositoryAPI),
});

export default container;
