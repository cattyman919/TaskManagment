import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '@AuthGuards/jwt-auth.guard';
import RequestWithUser from 'auth/interface/RequestWithUser.interface';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('admin')
  findAllForAdmin() {
    return this.tasksService.findAllForAdmin();
  }

  @Get()
  findAllForUser(@Req() request: RequestWithUser) {
    return this.tasksService.findAllForUser(request.user);
  }

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Req() request: RequestWithUser,
  ) {
    return this.tasksService.CreateTask(createTaskDto, request.user);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: RequestWithUser,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.UpdateTask(id, updateTaskDto, request.user);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: RequestWithUser,
  ) {
    return this.tasksService.RemoveTask(+id, request.user);
  }
}
