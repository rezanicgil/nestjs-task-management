import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    private readonly entityManager: EntityManager,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const qb = this.tasksRepository.createQueryBuilder('task');

    qb.where({ user });

    if (status) {
      qb.andWhere('task.status = :status', { status });
    }

    if (search) {
      qb.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        {
          search: `%${search}%`,
        },
      );
    }
    const tasks = await qb.getMany();
    return tasks;
  }
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description, status } = createTaskDto;
    const task = this.tasksRepository.create({
      title,
      description,
      status: status,
      user,
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
}
