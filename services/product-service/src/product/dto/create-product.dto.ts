import { IsEnum, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString, Max, Min, IsArray, ArrayMaxSize } from 'class-validator';
import { ProductCategory, ProductGrade } from '../product.entity';

export class CreateProductDto {
  @IsString() @IsNotEmpty()
  sku: string;

  @IsString() @IsNotEmpty()
  name: string;

  @IsString() @IsNotEmpty()
  brand: string;

  @IsOptional() @IsString()
  model?: string;

  @IsEnum(ProductCategory)
  category: ProductCategory;

  @IsEnum(ProductGrade)
  grade: ProductGrade;

  @IsOptional() @IsString()
  condition?: string;

  @IsOptional() @IsInt() @Min(0) @Max(8192)
  storage_gb?: number;

  @IsOptional() @IsString()
  color?: string;

  // numeric(12,2) as string to preserve precision
  @IsNumberString()
  price_amount: string;

  @IsString()
  price_currency: string; // e.g., ZAR

  @IsInt() @Min(0) @Max(60)
  warranty_months: number;

  @IsInt() @Min(0)
  stock: number;

  @IsOptional() @IsArray() @ArrayMaxSize(20)
  tags?: string[];

  @IsOptional() @IsString()
  description?: string;

  @IsOptional()
  images?: { url: string; alt?: string }[];

  @IsOptional() @IsInt() @Min(0) @Max(100)
  inspection_score?: number;

  @IsOptional() @IsString()
  inspection_report_url?: string;

  @IsOptional()
  is_active?: boolean;
}
