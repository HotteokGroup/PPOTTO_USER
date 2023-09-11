import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ModifyFileCommand, ModifyFileCommandResult } from './modify-file.command';
import { ERROR_CODE } from '../../../lib/exception/error.constant';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(ModifyFileCommand)
export class ModifyFileHandler implements ICommandHandler<ModifyFileCommand, ModifyFileCommandResult> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(params: ModifyFileCommand) {
    const { id, ...data } = params;
    // 파일이 존재하는지 확인한다
    const existingFile = await this.prismaService.userFileStore.findUnique({ where: { id } });
    if (!existingFile) throw new NotFoundException(ERROR_CODE.FILE_NOT_FOUND);

    // 파일데이터를 수정한다
    await this.prismaService.userFileStore.update({ where: { id }, data });

    return { id };
  }
}
