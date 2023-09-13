import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetFileListQuery, GetFileListQueryResult } from './get-file-list.query';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@QueryHandler(GetFileListQuery)
export class GetFileListHandler implements IQueryHandler<GetFileListQuery, GetFileListQueryResult> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ id, contentType, contentId, userId }: GetFileListQuery) {
    const result = await this.prismaService.userFileStore.findMany({
      where: { id: { in: id }, contentType: { in: contentType }, contentId: { in: contentId }, userId },
    });

    return new GetFileListQueryResult({ list: result });
  }
}
