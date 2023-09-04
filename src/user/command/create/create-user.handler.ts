import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';

import { CreateUserCommand, CreateUserCommandResult } from './create-user.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, CreateUserCommandResult> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ email, nickName, password }: CreateUserCommand) {
    // 이미 가입된 고객인지 확인
    const user = await this.prismaService.user.findFirst({ where: { email } });
    if (user) throw new BadRequestException(ERROR_CODE.USER_ALREADY_EXISTS);

    // 이미 사용중인 이름인 경우
    const existingUser = await this.prismaService.user.findFirst({
      where: { nickName },
    });
    if (existingUser) throw new BadRequestException(ERROR_CODE.USER_NICKNAME_ALREADY_EXISTS);

    // 고객 생성
    try {
      const { id } = await this.prismaService.user.create({
        data: { email, nickName, password: bcrypt.hashSync(password, 10) },
      });
      return { id };
    } catch (error) {
      throw new InternalServerErrorException(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
  }
}
