import { Controller, Post, Body, Patch, Param, ParseIntPipe, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { CreateUserRequest, CreateUserResponse } from './dto/create-user.dto';
import { GetUserResponse } from './dto/get-user.dto';
import { ModifyUserRequest } from './dto/modify-user.dto';
import { UserService } from './user.service';
import { ERROR_CODE, GenerateSwaggerDocumentByErrorCode } from '../lib/exception/error.constant';

@Controller('user')
@ApiTags('회원정보')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: '회원 생성',
    description: '이메일 기반 회원을 생성합니다.',
  })
  @GenerateSwaggerDocumentByErrorCode([
    ERROR_CODE.INVALID_DATA,
    ERROR_CODE.USER_ALREADY_EXISTS,
    ERROR_CODE.INTERNAL_SERVER_ERROR,
  ])
  async createUser(@Body() params: CreateUserRequest) {
    return plainToInstance(CreateUserResponse, await this.userService.create(params));
  }

  @Patch(':userId')
  @ApiOperation({
    summary: '회원정보 수정',
    description: `
    회원의 정보를 수정합니다.
    - 닉네임, 비밀번호, 프로필 이미지를 수정할 수 있습니다.
    `,
  })
  @GenerateSwaggerDocumentByErrorCode([
    ERROR_CODE.INVALID_DATA,
    ERROR_CODE.USER_NOT_FOUND,
    ERROR_CODE.INTERNAL_SERVER_ERROR,
    ERROR_CODE.USER_NICKNAME_ALREADY_EXISTS,
  ])
  async modifyUser(@Param('userId', ParseIntPipe) userId: number, @Body() params: ModifyUserRequest) {
    return this.userService.modify({ ...params, userId });
  }

  @Get(':userId')
  @ApiOperation({
    summary: '회원정보 & 약관동의정보 조회',
    description: '회원의 정보를 조회합니다.',
  })
  @GenerateSwaggerDocumentByErrorCode([
    ERROR_CODE.INTERNAL_SERVER_ERROR,
    ERROR_CODE.USER_NOT_FOUND,
    ERROR_CODE.INVALID_DATA,
  ])
  async getUserInfo(@Param('userId', ParseIntPipe) userId: number) {
    return plainToInstance(GetUserResponse, this.userService.getUserInfo(userId));
  }
}
