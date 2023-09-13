import { ApiProperty } from '@nestjs/swagger';
import { FileContentType } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class ModifyFileRequest {
  @ApiProperty({ description: '고객 아이디' })
  @IsNumber()
  @IsOptional()
  userId?: number;

  @ApiProperty({ description: '파일 유형 (프로필 이미지, 피드 이미지)', enum: FileContentType })
  @IsEnum(FileContentType)
  @IsOptional()
  contentType?: FileContentType;

  @ApiProperty({ description: '연결된 콘텐츠 아이디' })
  @IsString()
  @IsOptional()
  contentId?: string;

  @ApiProperty({ description: '원본 주소' })
  @IsString()
  @IsOptional()
  originalFileUrl?: string;

  @ApiProperty({ description: '작은 섬네일 주소' })
  @IsString()
  @IsOptional()
  smallThumbnailUrl?: string;

  @ApiProperty({ description: '중간 섬네일 주소' })
  @IsString()
  @IsOptional()
  mediumThumbnailUrl?: string;

  @ApiProperty({ description: '큰 섬네일 주소' })
  @IsString()
  @IsOptional()
  largeThumbnailUrl?: string;

  @ApiProperty({ description: '콘텐츠 관계 해제일' })
  @IsString()
  @IsOptional()
  disconnectedAt?: string;
}

export class ModifyFileResponse {
  @ApiProperty({ description: '파일 고유 아이디', example: 'CUID' })
  id: string;
}
