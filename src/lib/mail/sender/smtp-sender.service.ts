import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodeMailer from 'nodemailer';

import { MailSenderService } from '../mail.interface';

@Injectable()
export class SmtpMailSenderService implements MailSenderService {
  private readonly TRANSPORTER: nodeMailer.Transporter;

  /** SMTP Host */
  private readonly HOST: string;

  /** SMTP PORT */
  private readonly PORT: number;

  private readonly SECURE: boolean;

  /** auth User */
  private readonly USER: string;

  /** auth password */
  private readonly PASS: string;

  /** 보내는 이메일 주소 */
  private readonly FROM: string;

  constructor(private readonly configService: ConfigService) {
    this.FROM = this.configService.getOrThrow<string>('SMTP_FROM');
    this.HOST = this.configService.getOrThrow<string>('SMTP_HOST');
    this.PORT = Number(this.configService.getOrThrow<string>('SMTP_PORT'));
    this.SECURE = this.configService.getOrThrow<string>('SMTP_SECURE') === 'true';
    this.USER = this.configService.getOrThrow<string>('SMTP_USER_ID');
    this.PASS = this.configService.getOrThrow<string>('SMTP_PASS');

    this.TRANSPORTER = nodeMailer.createTransport({
      host: this.HOST,
      port: this.PORT,
      secure: this.SECURE,
      auth: {
        user: this.USER,
        pass: this.PASS,
      },
    });
  }

  async send(to: string, subject: string, body: string, textBody?: string): Promise<void> {
    return this.TRANSPORTER.sendMail({
      from: this.FROM,
      to,
      subject,
      html: body,
      text: textBody || body,
    });
  }
}
