import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    return await this.usersRepository.find();
  }
  async createUser(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }

  async findByUsername(username: string) {
    return await this.usersRepository.findOneBy({ username });
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
