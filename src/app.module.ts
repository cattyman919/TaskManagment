import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { DataNotFoundFilter } from './filters/DataNotFound.filter';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UsersModule, AuthModule, TasksModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DataNotFoundFilter,
    },
  ],
})
export class AppModule {}
