import { Transaction } from 'sequelize';

export interface UploadStaticAssetInterface {
  base64File: string;
  name: string;
  description?: string;
  assetType: 'icon' | 'projectPicture' | 'articlePicture' | 'staticAsset';
  trx?: Transaction;
}
