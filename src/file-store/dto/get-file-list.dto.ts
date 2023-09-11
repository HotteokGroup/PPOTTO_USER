import { ApiProperty } from '@nestjs/swagger';
import { FileContentType } from '@prisma/client';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ArrayUnique, IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetFileListRequest {
  @ApiProperty({ description: '파일 고유 아이디' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayUnique()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  id?: string[];

  @ApiProperty({ description: '파일 유형 (프로필 이미지, 피드 이미지)' })
  @IsOptional()
  @IsArray()
  @IsEnum(FileContentType, { each: true })
  @ArrayUnique()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  contentType?: FileContentType[];

  @ApiProperty({ description: '연결된 콘텐츠 아이디' })
  @IsOptional()
  @IsString({ each: true })
  @ArrayUnique()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  contentId?: string[];

  @ApiProperty({ description: '고객 아이디' })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  userId?: number;
}

@Exclude()
export class GetFileListItem {
  @Expose()
  @ApiProperty({ description: '파일 고유 아이디' })
  id: string;

  @Expose()
  @ApiProperty({ description: '파일 유형 (프로필 이미지, 피드 이미지)', enum: FileContentType })
  contentType: FileContentType;

  @Expose()
  @ApiProperty({ description: '고객 아이디', example: 1 })
  userId: number;

  @Expose()
  @ApiProperty({ description: '연결된 콘텐츠 아이디', example: '1' })
  contentId?: string;

  @Expose()
  @ApiProperty({ description: '파일명', example: 'test' })
  fileName?: string;

  @Expose()
  @ApiProperty({ description: '원본 주소', example: 'uploads/test.jpg' })
  originUrl?: string;

  @Expose()
  @ApiProperty({ description: '원본 최대비율 주소', example: 'output/originalCompressed.webp' })
  originalCompressedUrl?: string;

  @Expose()
  @ApiProperty({ description: '작은이미지 주소', example: 'output/small.webp' })
  smallUrl?: string;

  @Expose()
  @ApiProperty({ description: '중간이미지 주소', example: 'output/medium.webp' })
  mediumUrl?: string;

  @Expose()
  @ApiProperty({ description: '큰이미지 주소', example: 'output/large.webp' })
  largeUrl?: string;

  @Expose()
  @ApiProperty({ description: '삭제일', example: '2021-01-01T00:00:00.000Z' })
  deletedAt?: Date;

  @Expose()
  @ApiProperty({ description: '생성일', example: '2021-01-01T00:00:00.000Z' })
  createdAt?: Date;
}

@Exclude()
export class GetFileListResponse {
  @Expose()
  @Type(() => GetFileListItem)
  list: GetFileListItem[];
}
