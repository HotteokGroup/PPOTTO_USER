import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { CreateFileCommand } from './command/create/create-file.command';
import { ModifyFileCommand } from './command/modify/modify-file.command';
import { CreateFileRequest, CreateFileResponse } from './dto/create-file.dto';
import { GetFileListRequest, GetFileListResponse } from './dto/get-file-list.dto';
import { ModifyFileRequest, ModifyFileResponse } from './dto/modify-file.dto';
import { GetFileListQuery } from './query/get-list/get-file-list.query';
import { ERROR_CODE, GenerateSwaggerDocumentByErrorCode } from '../lib/exception/error.constant';

@Controller('file-store')
@ApiTags('회원 파일 관리')
export class FileStoreController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: '파일 조회', description: '파일을 조회합니다.' })
  @GenerateSwaggerDocumentByErrorCode([ERROR_CODE.INTERNAL_SERVER_ERROR])
  async getFileList(@Query() params: GetFileListRequest) {
    return plainToInstance(GetFileListResponse, await this.queryBus.execute(new GetFileListQuery(params)));
  }

  @Post()
  @ApiOperation({ summary: '파일 생성', description: '파일을 생성합니다.' })
  @GenerateSwaggerDocumentByErrorCode([ERROR_CODE.INTERNAL_SERVER_ERROR])
  async createFile(@Body() params: CreateFileRequest) {
    return plainToInstance(CreateFileResponse, await this.commandBus.execute(new CreateFileCommand(params)));
  }

  @Patch(':fileId')
  @ApiOperation({ summary: '파일 수정', description: '파일을 수정합니다.' })
  @GenerateSwaggerDocumentByErrorCode([ERROR_CODE.INTERNAL_SERVER_ERROR])
  async modifyFile(@Param('fileId') fileId: string, @Body() params: ModifyFileRequest) {
    return plainToInstance(
      ModifyFileResponse,
      await this.commandBus.execute(new ModifyFileCommand({ id: fileId, ...params })),
    );
  }
}
