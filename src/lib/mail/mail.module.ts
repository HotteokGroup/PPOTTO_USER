import { Module } from '@nestjs/common';

import { SmtpMailSenderService } from './sender/smtp-sender.service';

@Module({
  providers: [SmtpMailSenderService],
  exports: [SmtpMailSenderService],
})
export class MailModule {}
