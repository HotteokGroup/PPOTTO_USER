import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AgreeTermsOfServiceCommand } from './agree-terms.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(AgreeTermsOfServiceCommand)
export class AgreeTermsOfServiceHandler implements ICommandHandler<AgreeTermsOfServiceCommand, void> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: AgreeTermsOfServiceCommand) {
    const { userId, termsOfServiceIds } = command;

    // 존재하는 고객 확인
    const user = await this.prismaService.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException(ERROR_CODE.USER_NOT_FOUND);

    // 존재하는 약관인지 확인
    const termsOfServices = await this.prismaService.termsOfService.findMany({
      where: { id: { in: termsOfServiceIds } },
    });
    if (termsOfServices.length !== termsOfServiceIds.length)
      throw new NotFoundException(ERROR_CODE.TERMS_OF_SERVICE_NOT_FOUND);

    // 약관 동의 기록 저장
    try {
      await this.prismaService.userTermsOfServiceAgreement.createMany({
        data: termsOfServiceIds.map((id) => ({ userId, termsOfServiceId: id })),
      });
    } catch (error) {
      throw new InternalServerErrorException({
        ...ERROR_CODE.INTERNAL_SERVER_ERROR,
        message: '약관 동의 기록 저장에 실패했습니다.',
      });
    }
  }
}
