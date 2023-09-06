import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateUserHandler } from './command/create/create-user.handler';
import { LoginByEmailHandler } from './command/login-by-email/login-by-email.handler';
import { ModifyUserHandler } from './command/modify/modify-user.handler';
import { GetUserInfoHandler } from './query/get-user-info/get-user-info.handler';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../lib/prisma/prisma.module';

const UserCommandHandlerList = [CreateUserHandler, ModifyUserHandler, LoginByEmailHandler];
const UserQueryHandlerList = [GetUserInfoHandler];

@Module({
  imports: [PrismaModule, CqrsModule],
  controllers: [UserController],
  providers: [UserService, ...UserCommandHandlerList, ...UserQueryHandlerList],
})
export class UserModule {}
