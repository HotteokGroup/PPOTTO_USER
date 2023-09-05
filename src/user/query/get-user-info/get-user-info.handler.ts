import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetUserInfoQuery, GetUserInfoQueryResult } from './get-user-info.query';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@QueryHandler(GetUserInfoQuery)
export class GetUserInfoHandler implements IQueryHandler<GetUserInfoQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ userId }: GetUserInfoQuery) {
    // 고객정보 및 동의약관정보 리스트 조회
    const result = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        UserTermsOfServiceAgreement: {
          select: { id: true, termsOfServiceId: true, deletedAt: true, createdAt: true, updatedAt: true, userId: true },
        },
      },
    });
    if (!result) throw new NotFoundException(ERROR_CODE.USER_NOT_FOUND);

    return new GetUserInfoQueryResult(result);
  }
}
