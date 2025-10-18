import { IsInt, IsNumberString, IsOptional, IsString, IsIn } from 'class-validator';
import { OrderStatus } from '../order.entity';

export class CreateOrderDto {
  @IsInt()
  productId!: number;

  @IsNumberString()
  totalPrice!: string; // e.g. "8999.00"

  @IsString()
  @IsOptional()
  currency?: string = 'ZAR';

  @IsString()
  @IsOptional()
  paymentMethod?: string;

  // optional product snapshot
  @IsString()
  @IsOptional()
  productName?: string;

  @IsString()
  @IsOptional()
  productBrand?: string;

  @IsString()
  @IsOptional()
  productGrade?: string;

  @IsString()
  @IsOptional()
  productImage?: string;

  @IsString()
  @IsOptional()
  @IsIn(Object.values(OrderStatus))
  status?: OrderStatus;
}
