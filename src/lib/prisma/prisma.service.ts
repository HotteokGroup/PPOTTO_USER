import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly NODE_ENV: string = this.configService.getOrThrow('NODE_ENV');
  constructor(private readonly configService: ConfigService) {
    super();
  }
  async onModuleInit() {
    if (this.NODE_ENV === 'offline') {
      return;
    }
    await this.$connect();
  }
}
