import { NotFoundException } from '@nestjs/common';
import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';

import { LoginByEmailCommand, LoginByEmailCommandResult } from './login-by-email.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(LoginByEmailCommand)
export class LoginByEmailHandler implements IQueryHandler<LoginByEmailCommand, LoginByEmailCommandResult> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(params: LoginByEmailCommand) {
    const { email, password } = params;
    // 일치하는 고객정보 검색
    const userInfo = await this.prismaService.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });
    if (!userInfo) throw new NotFoundException(ERROR_CODE.USER_NOT_FOUND);
    if (!bcrypt.compareSync(password, userInfo.password)) throw new NotFoundException(ERROR_CODE.USER_NOT_FOUND);

    return new LoginByEmailCommandResult(userInfo);
  }
}
