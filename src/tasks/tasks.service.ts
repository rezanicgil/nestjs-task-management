import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    private readonly entityManager: EntityManager,
  ) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, status } = createTaskDto;
    const task = this.tasksRepository.create({
      title,
      description,
      status: status,
    });

    await this.tasksRepository.save(task);
    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id: id } });
    if (!found) {
      throw new NotFoundException(`Task with ID: '${id}' not found`);
    }
    return found;
  }
  async deleteTask(id: string): Promise<void> {
    const found = await this.getTaskById(id);

    await this.tasksRepository.remove(found);
  }
  async updateTaskById(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.getTaskById(id);
    const { title, description, status } = updateTaskDto;
    if (description) task.description = description;
    if (title) task.title = title;
    if (status) task.status = status;
    return await this.tasksRepository.save(task);
  }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }
}
