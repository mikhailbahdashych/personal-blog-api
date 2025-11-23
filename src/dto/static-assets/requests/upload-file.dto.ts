import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UploadFileDto {
  @IsString()
  name: string;

  @IsString()
  base64File: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(['icon', 'projectPicture', 'articlePicture', 'staticAsset'])
  assetType: 'icon' | 'projectPicture' | 'articlePicture' | 'staticAsset';
}
