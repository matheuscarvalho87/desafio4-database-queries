import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOneOrFail(user_id,{
      relations: ['games']
    }) ;
    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    //find all users ordered by first name using raw query
    const sql = 'SELECT * FROM users ORDER BY first_name ASC';
    return await this.repository.query(sql); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    //find user by full name using raw query
    const sql = `
     SELECT * FROM users
     WHERE lower(first_name) = '${first_name.toLowerCase()}' 
     AND lower(last_name) = '${last_name.toLowerCase()}'`;
     
    const response = await this.repository.query(sql);
    
    return response; // Complete usando raw query
  }
}
