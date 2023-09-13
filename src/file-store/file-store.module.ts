import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateFileHandler } from './command/create/create-file.handler';
import { ModifyFileHandler } from './command/modify/modify-file.handler';
import { FileStoreController } from './file-store.controller';
import { GetFileListHandler } from './query/get-list/get-file-list.handler';
import { PrismaModule } from '../lib/prisma/prisma.module';

const fileStoreCommandHandlerList = [CreateFileHandler, ModifyFileHandler];
const fileStoreQueryHandlerList = [GetFileListHandler];

@Module({
  imports: [PrismaModule, CqrsModule],
  controllers: [FileStoreController],
  providers: [...fileStoreCommandHandlerList, ...fileStoreQueryHandlerList],
})
export class FileStoreModule {}
