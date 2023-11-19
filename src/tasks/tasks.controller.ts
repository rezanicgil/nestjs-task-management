import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

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
  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  @Get('/:id')
  getTaskById(@Param('id') id): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }
  // @Delete('/:id')
  // deleteTaskById(@Param('id') id): void {
  //   this.tasksService.deleteTaskById(id);
  // }
  // @Post('/:id')
  // updateTaskById(@Param('id') id, @Body() updateTaskDto: UpdateTaskDto): void {
  //   this.tasksService.updateTaskById(id, updateTaskDto);
  // }
}
