import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';

import { ModifyUserCommand, ModifyUserCommandResult } from './modify-user.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(ModifyUserCommand)
export class ModifyUserHandler implements ICommandHandler<ModifyUserCommand, ModifyUserCommandResult> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ userId, ...params }: ModifyUserCommand) {
    // 존재하지 않는 고객인 경우
    const user = await this.prismaService.user.findUnique({ where: { id: userId } });
    if (!user) throw new BadRequestException(ERROR_CODE.USER_NOT_FOUND);

    // 이미 사용중인 이름인 경우
    const existingUser = await this.prismaService.user.findFirst({
      where: { nickName: params.nickName, NOT: { id: userId } },
    });
    if (existingUser) throw new BadRequestException(ERROR_CODE.USER_NICKNAME_ALREADY_EXISTS);

    // 고객정보 수정
    await this.prismaService.user.update({
      where: { id: userId },
      data: { ...params, ...(params.password && { password: bcrypt.hashSync(params.password, 10) }) },
    });

    return {
      id: userId,
    };
  }
}
