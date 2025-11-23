import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UploadBase64Dto {
  @IsString()
  name: string;

  @IsString()
  base64Image: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(['icon', 'projectPicture', 'articlePicture', 'staticAsset'])
  assetType: 'icon' | 'projectPicture' | 'articlePicture' | 'staticAsset';
}
