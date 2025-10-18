import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Delete,
  Query,
  Inject,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard, CurrentUser } from '@afrotek/common';

@Controller('products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(
    private readonly service: ProductService,
    private readonly config: ConfigService,
    @Inject('S3_CLIENT') private readonly s3: S3Client,
  ) {}

  // ✅ Create product (protected, but fallback-safe if JWT is not set up yet)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateProductDto, @CurrentUser() user?: any) {
    try {
      // If auth not ready, log a notice instead of failing
      if (!user) {
        this.logger.warn(
          'JWT strategy not initialized — creating product without user context (development mode).',
        );
      }

      const product = await this.service.create(dto);
      return product;
    } catch (err) {
      this.logger.error('Error creating product', err.stack || err.message);
      throw err;
    }
  }

  // ✅ List products (public)
  @Get()
  list(@Query() q: QueryProductDto) {
    return this.service.findAll(q);
  }

  // ✅ Get one product (public)
  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // ✅ Update product (protected)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.service.update(id, dto);
  }

  // ✅ Soft delete product (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  // ✅ Generate pre-signed S3 upload URL (protected)
  @UseGuards(JwtAuthGuard)
  @Post(':id/images/presign')
  async getPresignedUrl(@Param('id', ParseIntPipe) id: number) {
    const bucket = this.config.get<string>('AWS_S3_BUCKET');
    if (!bucket) {
      this.logger.error('AWS_S3_BUCKET not set in environment variables.');
      throw new Error('S3 bucket not configured.');
    }

    const key = `products/${id}/${Date.now()}.jpg`;
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: 'image/jpeg',
    });

    const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });
    return { upload_url: url, key };
  }
}
