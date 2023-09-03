import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand, CreateUserCommandResult } from './create-user.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, CreateUserCommandResult> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ email }: CreateUserCommand) {
    // 이미 가입된 고객인지 확인
    const user = await this.prismaService.user.findFirst({ where: { email, NOT: { activatedAt: null } } });
    if (user) throw new BadRequestException(ERROR_CODE.USER_ALREADY_EXISTS);

    // 고객 생성
    const { id } = await this.prismaService.user.create({
      data: { email },
    });

    return { id };
  }
}
