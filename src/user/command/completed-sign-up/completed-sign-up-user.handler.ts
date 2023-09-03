import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CompletedSignUpUserCommand, CompletedSignUpUserCommandResult } from './completed-sign-up-user.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(CompletedSignUpUserCommand)
export class CompletedSignUpUserHandler
  implements ICommandHandler<CompletedSignUpUserCommand, CompletedSignUpUserCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ userId }: CompletedSignUpUserCommand) {
    // NOTE: 고객인증 완료 여부 체크는 BFF에서 처리
    // 고객 확인
    const user = await this.prismaService.user.findFirst({
      where: { id: userId, activatedAt: null, deletedAt: null },
      select: { nickName: true, password: true },
    });
    if (!user) throw new NotFoundException(ERROR_CODE.USER_NOT_FOUND);

    // 고객 필수데이터 확인
    if (user.nickName === null || user.password === null)
      throw new NotFoundException(ERROR_CODE.USER_NOT_COMPLETED_SIGN_UP);

    // 고객 활성화
    await this.prismaService.user.update({ where: { id: userId }, data: { activatedAt: new Date() } });

    return new CompletedSignUpUserCommandResult({ userId });
  }
}
