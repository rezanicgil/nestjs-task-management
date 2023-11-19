import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }
  @Delete('/:id')
  deleteTaskById(@Param('id') id): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Post('/:id')
  updateTaskById(
    @Param('id') id,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateTaskById(id, updateTaskDto);
  }
}
