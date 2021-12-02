import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder
    const games = await this.repository
      .createQueryBuilder("games")
      .where("games.title ilike :title", { title: `%${param}%` })
      .getMany();

    return games;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    // Complete usando raw query
    return await this.repository.query(`SELECT COUNT(*) FROM games`);
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const games = await this.repository
      .createQueryBuilder("games")
      .innerJoinAndSelect("games.users", "users")
      .where("games.id = :id", { id })
      .getOneOrFail();

    return games.users;
  }
}
