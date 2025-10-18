import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ProductCategory, ProductGrade } from '../product.entity';

export class QueryProductDto {
  @IsOptional() @IsString()
  q?: string; // search name/model/brand

  @IsOptional() @IsString()
  brand?: string;

  @IsOptional() @IsEnum(ProductCategory)
  category?: ProductCategory;

  @IsOptional() @IsEnum(ProductGrade)
  grade?: ProductGrade;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt() @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt() @Min(1)
  limit?: number = 12;

  @IsOptional() @IsString()
  sort?: 'price_asc' | 'price_desc' | 'newest';
}
