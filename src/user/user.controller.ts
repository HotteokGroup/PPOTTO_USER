import { Controller, Post, Body, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserCommand } from './command/create/create-user.command';
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
    description: `
    이메일 기반 회원을 생성합니다.
    - 가입완료처리 API 호출 시 계정이 활성화됩니다.
    `,
  })
  @GenerateSwaggerDocumentByErrorCode([
    ERROR_CODE.INVALID_DATA,
    ERROR_CODE.USER_ALREADY_EXISTS,
    ERROR_CODE.INTERNAL_SERVER_ERROR,
  ])
  async createUser(@Body() params: CreateUserCommand) {
    return this.userService.create(params);
  }

  @Patch(':userId')
  @ApiOperation({
    summary: '회원 정보 수정',
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
}
