import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CompletedSignUpUserHandler } from './command/completed-sign-up/completed-sign-up-user.handler';
import { CreateUserHandler } from './command/create/create-user.handler';
import { ModifyUserHandler } from './command/modify/modify-user.handler';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../lib/prisma/prisma.module';

const UserCommandHandlerList = [CreateUserHandler, ModifyUserHandler, CompletedSignUpUserHandler];

@Module({
  imports: [PrismaModule, CqrsModule],
  controllers: [UserController],
  providers: [UserService, ...UserCommandHandlerList],
})
export class UserModule {}
