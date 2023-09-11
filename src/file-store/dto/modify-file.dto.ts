import { ApiProperty } from '@nestjs/swagger';
import { FileContentType } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class ModifyFileRequest {
  @ApiProperty({ description: '파일 유형 (프로필 이미지, 피드 이미지)', enum: FileContentType })
  @IsEnum(FileContentType)
  @IsOptional()
  contentType?: FileContentType;

  @ApiProperty({ description: '연결된 콘텐츠 아이디' })
  @IsString()
  @IsOptional()
  contentId?: string;

  @ApiProperty({ description: '고객 아이디' })
  @IsNumber()
  @IsOptional()
  userId?: number;

  @ApiProperty({ description: '파일명' })
  @IsString()
  @IsOptional()
  fileName?: string;

  @ApiProperty({ description: '원본 주소' })
  @IsString()
  @IsOptional()
  originalUrl?: string;

  @ApiProperty({ description: '원본 최대비율 주소' })
  @IsString()
  @IsOptional()
  originalCompressedUrl?: string;

  @ApiProperty({ description: '작은이미지 주소' })
  @IsString()
  @IsOptional()
  smallUrl?: string;

  @ApiProperty({ description: '중간이미지 주소' })
  @IsString()
  @IsOptional()
  mediumUrl?: string;

  @ApiProperty({ description: '큰이미지 주소' })
  @IsString()
  @IsOptional()
  largeUrl?: string;
}

export class ModifyFileResponse {
  @ApiProperty({ description: '파일 고유 아이디', example: 'CUID' })
  id: string;
}
