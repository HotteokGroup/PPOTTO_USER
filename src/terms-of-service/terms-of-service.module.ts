import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AgreeTermsOfServiceHandler } from './command/agree-terms/agree-terms.handler';
import { TermsOfServiceController } from './terms-of-service.controller';
import { TermsOfServiceService } from './terms-of-service.service';
import { PrismaModule } from '../lib/prisma/prisma.module';

const termsOfServiceCommandHandlers = [AgreeTermsOfServiceHandler];

@Module({
  imports: [PrismaModule, CqrsModule],
  controllers: [TermsOfServiceController],
  providers: [TermsOfServiceService, ...termsOfServiceCommandHandlers],
})
export class TermsOfServiceModule {}
