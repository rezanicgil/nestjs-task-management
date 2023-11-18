import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    console.log('Title: ', title);
    console.log('Description: ', description);

    return this.tasksService.createTask(title, description);
  }

  @Get('/:id')
  getTaskById(@Param('id') id): Task {
    return this.tasksService.getTaskById(id);
  }
}
