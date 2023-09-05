import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as dayjs from 'dayjs';

import { ConfirmVerificationCommand, ConfirmVerificationCommandResult } from './confirm-verification.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(ConfirmVerificationCommand)
export class ConfirmVerificationHandler
  implements ICommandHandler<ConfirmVerificationCommand, ConfirmVerificationCommandResult>
{
  // 최대 5회까지 인증시도 가능
  private readonly MAXIMUM_VERIFICATION_COUNT = 5;

  // 인증요청은 10분간 유효
  private readonly VERIFICATION_EXPIRE_MINUTES = 10;

  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: ConfirmVerificationCommand): Promise<ConfirmVerificationCommandResult> {
    const { id, verificationCode } = command;

    // 인증기록 조회
    const verification = await this.prismaService.userIdentityVerification.findUnique({ where: { id } });
    if (!verification) throw new NotFoundException(ERROR_CODE.VERIFICATION_NOT_FOUND);
    // 인증시도 5회 초과
    if (verification.failCount >= this.MAXIMUM_VERIFICATION_COUNT)
      throw new BadRequestException(ERROR_CODE.VERIFICATION_EXCEED_MAXIMUM_COUNT);
    // 인증시작시간 초과
    if (dayjs(verification.createdAt).add(this.VERIFICATION_EXPIRE_MINUTES, 'minute').isBefore(dayjs()))
      throw new BadRequestException(ERROR_CODE.VERIFICATION_EXPIRED);

    // 인증코드 일치여부 확인, 실패횟수
    const isMatched = verification.verificationCode === verificationCode;
    const failCount = isMatched ? verification.failCount : verification.failCount + 1;
    // 인증기록 업데이트
    await this.prismaService.userIdentityVerification.update({
      where: { id },
      data: {
        failCount,
        // 인증성공시 인증시간 기록
        ...(isMatched && { verifiedAt: new Date() }),
      },
    });

    return new ConfirmVerificationCommandResult({
      id,
      result: isMatched,
      remaining: this.MAXIMUM_VERIFICATION_COUNT - failCount,
    });
  }
}
