import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'S3_CLIENT', // ✅ this token name must match the @Inject() in your controller
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const region = config.get<string>('AWS_REGION') || 'af-south-1';
        const accessKeyId = config.get<string>('AWS_ACCESS_KEY_ID');
        const secretAccessKey = config.get<string>('AWS_SECRET_ACCESS_KEY');

        const options: any = { region };
        if (accessKeyId && secretAccessKey) {
          options.credentials = { accessKeyId, secretAccessKey };
        }

        return new S3Client(options);
      },
    },
  ],
  exports: ['S3_CLIENT'], // ✅ export same token
})
export class AwsModule {}
