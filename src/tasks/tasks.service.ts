import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto, user: User) {
    return await this.tasksRepository.save({ ...createTaskDto, user });
  }

  async findAll() {
    return await this.tasksRepository.find();
  }

  async findOne(id: number) {
    return await this.tasksRepository.findOneBy({ id });
  }

  async ChangePriority() {}

  async ChangeStatus() {}

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
