import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Task } from '../tasks/task.entity';
import { User } from '../auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: await configService.getOrThrow('DB_HOST'),
        port: await configService.getOrThrow('DB_PORT'),
        name: await configService.getOrThrow('DB_NAME'),
        password: await configService.getOrThrow('DB_PASSWORD'),
        username: await configService.getOrThrow('DB_USER'),
        entities: [Task, User],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
