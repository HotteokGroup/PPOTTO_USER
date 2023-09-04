import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { SendVerificationRequest, SendVerificationResponse } from './dto/send-verification.dto';
import { VerificationService } from './verification.service';
import { ERROR_CODE, GenerateSwaggerDocumentByErrorCode } from '../lib/exception/error.constant';

@Controller('verification')
@ApiTags('인증')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @ApiOperation({ summary: '인증 요청', description: '인증을 요청합니다. 현재 이메일인증만 지원' })
  @GenerateSwaggerDocumentByErrorCode([
    ERROR_CODE.INTERNAL_SERVER_ERROR,
    ERROR_CODE.INVALID_DATA,
    ERROR_CODE.USER_NOT_FOUND,
    { ...ERROR_CODE.INTERNAL_SERVER_ERROR, message: '인증정보 저장에 실패했을 경우' },
  ])
  @Post()
  async sendVerification(@Body() data: SendVerificationRequest) {
    return plainToInstance(SendVerificationResponse, await this.verificationService.sendVerification(data));
  }
}
