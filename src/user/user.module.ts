import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateUserHandler } from './command/create/create-user.handler';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../lib/prisma/prisma.module';

const UserCommandHandlerList = [CreateUserHandler];

@Module({
  imports: [PrismaModule, CqrsModule],
  controllers: [UserController],
  providers: [UserService, ...UserCommandHandlerList],
})
export class UserModule {}
