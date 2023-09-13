import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateFileCommand, CreateFileCommandResult } from './create-file.command';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@CommandHandler(CreateFileCommand)
export class CreateFileHandler implements ICommandHandler<CreateFileCommand, CreateFileCommandResult> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ contentType, userId }: CreateFileCommand) {
    const { id } = await this.prismaService.userFileStore.create({
      data: { contentType, userId },
    });

    return { id };
  }
}
