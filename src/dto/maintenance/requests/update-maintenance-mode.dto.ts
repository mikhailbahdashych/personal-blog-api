import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  ValidateIf
} from 'class-validator';

export class UpdateMaintenanceModeDto {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  message?: string;

  @ValidateIf((o) => !o.isPermanent && o.fromDate !== undefined)
  @IsDateString()
  fromDate?: string;

  @ValidateIf((o) => !o.isPermanent && o.toDate !== undefined)
  @IsDateString()
  toDate?: string;

  @IsOptional()
  @IsString()
  heroImageId?: string;

  @IsOptional()
  @IsString()
  heroTitle?: string;

  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsBoolean()
  isPermanent?: boolean;
}
