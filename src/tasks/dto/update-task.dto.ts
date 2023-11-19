import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.status.enum';

export class UpdateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;
}
