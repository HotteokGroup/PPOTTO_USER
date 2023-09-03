import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserCommand } from './command/create/create-user.command';
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
  @GenerateSwaggerDocumentByErrorCode([ERROR_CODE.INVALID_DATA, ERROR_CODE.USER_ALREADY_EXISTS])
  async createUser(@Body() params: CreateUserCommand) {
    return this.userService.create(params);
  }
}
