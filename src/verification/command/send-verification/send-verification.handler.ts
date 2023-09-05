import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SendVerificationCommand, SendVerificationCommandResult } from './send-verification.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(SendVerificationCommand)
export class SendVerificationHandler
  implements ICommandHandler<SendVerificationCommand, SendVerificationCommandResult>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: SendVerificationCommand): Promise<SendVerificationCommandResult> {
    const { verificationType } = command;

    // 인증 유형에 따른 분기 처리
    switch (verificationType) {
      case 'EMAIL': {
        return this.sendEmailVerification(command);
      }
      default: {
        throw new InternalServerErrorException(ERROR_CODE.INTERNAL_SERVER_ERROR);
      }
    }
  }

  private async sendEmailVerification(command: SendVerificationCommand): Promise<SendVerificationCommandResult> {
    const { emailAddress, userId } = command;
    // 고객을 인자로 전달받았을 경우 존재하는지 확인
    if (userId) {
      const user = await this.prismaService.user.findUnique({ where: { id: userId } });
      if (!user) throw new NotFoundException(ERROR_CODE.USER_NOT_FOUND);
    }

    // 인증기록 저장
    try {
      // 6자리 인증번호 생성
      const verificationCode = Math.floor(100000 + Math.random() * 900000);
      const { id } = await this.prismaService.userIdentityVerification.create({
        data: {
          verificationType: 'EMAIL',
          verificationCode: verificationCode.toString(),
          userId,
          emailAddress,
        },
      });
      return new SendVerificationCommandResult({ id });
    } catch (error) {
      throw new InternalServerErrorException({
        ...ERROR_CODE.INTERNAL_SERVER_ERROR,
        message: '인증기록 저장에 실패했습니다.',
      });
    }
  }
}
