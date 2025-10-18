import { IsIn, IsString } from 'class-validator';
import { OrderStatus } from '../order.entity';

export class UpdateStatusDto {
  @IsString()
  @IsIn(Object.values(OrderStatus))
  status!: OrderStatus;
}
