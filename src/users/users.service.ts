import { Injectable, UseFilters } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { DataNotFoundFilter } from 'filters/DataNotFound.filter';
@Injectable()
@UseFilters(DataNotFoundFilter)
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

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
