import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../lib/prisma/prisma.service';
import { GetUserListQuery, GetUserListQueryResult } from './get-user-list.query';

@QueryHandler(GetUserListQuery)
export class GetUserListHandler implements IQueryHandler<GetUserListQuery, GetUserListQueryResult> {
  constructor(private readonly prismaService: PrismaService) {}
  async execute(query: GetUserListQuery): Promise<GetUserListQueryResult> {
    const { userId, includeDeletedUser } = query;

    const userList = await this.prismaService.user.findMany({
      where: {
        id: {
          in: userId,
        },
        ...(!includeDeletedUser && { deletedAt: null }),
      },
    });

    return new GetUserListQueryResult({ list: userList, total: userList.length });
  }
}
