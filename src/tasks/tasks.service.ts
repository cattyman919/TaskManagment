import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from 'users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async findAllForAdmin() {
    return await this.tasksRepository.find();
  }

  async findAllForUser(user: User) {
    return await this.tasksRepository.find({
      where: { user: { id: user.id } },
    });
  }
  async CreateTask(createTaskDto: CreateTaskDto, user: User) {
    return await this.tasksRepository.save({ ...createTaskDto, user });
  }
  async UpdateTask(id: number, updateTaskDto: UpdateTaskDto, user: User) {
    const task = await this.GetTaskById(id);

    if (!task) throw new EntityNotFoundError(Task, id);

    // Verify the owner of the task
    this.VerifyOwnerTask(+task.user, user.id);

    // Update the data in the database
    await this.tasksRepository.update(id, updateTaskDto);

    const { title, description, priority } = task;
    return {
      message: 'Task has successfully been updated',
      title,
      description,
      priority,
      ...updateTaskDto,
    };
  }

  async RemoveTask(id: number, user: User) {
    const task = await this.GetTaskById(id);

    if (!task) throw new EntityNotFoundError(Task, id);

    this.VerifyOwnerTask(+task.user, user.id);

    await this.tasksRepository.delete({ id });
    return {
      message: 'Task has been successfully deleted',
      ...task,
    };
  }

  GetTaskById(id: number) {
    return this.tasksRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });
  }

  VerifyOwnerTask(taskUserId: number, userId: number) {
    if (taskUserId !== userId)
      throw new HttpException(
        'Not owner of the task (Unable to modify task)',
        HttpStatus.UNAUTHORIZED,
      );
    return;
  }
}
