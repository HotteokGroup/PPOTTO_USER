import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetTermsOfServiceQuery, GetTermsOfServiceQueryResult } from './get-terms.query';
import { PrismaService } from '../../lib/prisma/prisma.service';

@QueryHandler(GetTermsOfServiceQuery)
export class GetTermsOfServiceHandler implements IQueryHandler<GetTermsOfServiceQuery, GetTermsOfServiceQueryResult> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(): Promise<GetTermsOfServiceQueryResult> {
    const list = await this.prismaService.termsOfService.findMany({ where: { deletedAt: null } });
    return new GetTermsOfServiceQueryResult({ list });
  }
}
