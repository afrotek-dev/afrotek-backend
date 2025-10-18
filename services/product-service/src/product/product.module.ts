import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AwsModule } from '../aws/aws.module'; // ✅ import AWS integration

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ConfigModule, // ✅ ensures ConfigService is available
    AwsModule, // ✅ ensures S3 client is injected
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
