import { ApiProperty } from '@nestjs/swagger';
import { FileContentType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFileRequest {
  @ApiProperty({ description: '파일 유형 (프로필 이미지, 피드 이미지)', enum: FileContentType })
  @IsEnum(FileContentType)
  @IsNotEmpty()
  contentType: FileContentType;

  @ApiProperty({ description: '고객 아이디', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

export class CreateFileResponse {
  @ApiProperty({ description: '파일 고유 아이디' })
  id: string;
}
