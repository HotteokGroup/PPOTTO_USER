import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AgreeTermsOfServiceRequest } from './dto/agree-terms.dto';
import { TermsOfServiceService } from './terms-of-service.service';
import { ERROR_CODE, GenerateSwaggerDocumentByErrorCode } from '../lib/exception/error.constant';

@Controller('terms-of-service')
@ApiTags('약관')
export class TermsOfServiceController {
  constructor(private readonly termsOfServiceService: TermsOfServiceService) {}

  @ApiOperation({ summary: '약관 동의', description: '약관을 동의합니다.' })
  @GenerateSwaggerDocumentByErrorCode([
    ERROR_CODE.INVALID_DATA,
    ERROR_CODE.TERMS_OF_SERVICE_NOT_FOUND,
    ERROR_CODE.USER_NOT_FOUND,
    {
      ...ERROR_CODE.INTERNAL_SERVER_ERROR,
      message: '약관 동의 기록 저장에 실패했습니다.',
    },
  ])
  @Post('/agree')
  async agreeTermsOfService(@Body() data: AgreeTermsOfServiceRequest) {
    await this.termsOfServiceService.agreeTermsOfService(data);
  }
}
