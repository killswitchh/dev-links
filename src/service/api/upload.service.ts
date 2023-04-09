import {
  R2_ACCESS_KEY_ID,
  R2_ACCOUNT_ID,
  R2_BUCKET_NAME,
  R2_SECRET_ACCESS_KEY_ID,
} from '$env/static/private';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export const UploadService = {
  async uploadImage(fileBlob: File, destination: string = ''): Promise<string> {
    const file: File = new File(
      [fileBlob],
      `${crypto.randomUUID()}.${fileBlob.name.split('.').pop()}`,
      { type: fileBlob.type },
    );
    console.log('ATTEMPTING TO UPLOAD FILE', file);
    const s3 = await this.getR2Instance();
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: destination + file.name,
      Body: (await file.arrayBuffer()) as unknown as Buffer, // body accepts array buffer
    });
    await s3.send(command);
    return destination + file.name;
  },

  async getR2Instance() {
    return new S3Client({
      region: 'auto',
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY_ID,
      },
    });
  },
};

export default UploadService;
