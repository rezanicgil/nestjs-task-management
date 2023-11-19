import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Task } from 'src/tasks/task.entity';
import { User } from 'src/auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        name: configService.getOrThrow('DB_NAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        username: configService.getOrThrow('DB_USER'),
        entities: [Task, User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
