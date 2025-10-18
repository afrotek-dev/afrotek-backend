import {
  Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, ForbiddenException
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { JwtAuthGuard, CurrentUser } from '@afrotek/common';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly service: OrderService) {}

  // User creates an order (e.g., after checkout – Paystack will be integrated later)
  @Post()
  create(@CurrentUser() user: any, @Body() dto: CreateOrderDto) {
    return this.service.create(user.userId ?? user.sub, dto);
  }

  // User lists their orders
  @Get()
  listMy(
    @CurrentUser() user: any,
    @Query('page') page = '1',
    @Query('limit') limit = '12',
  ) {
    return this.service.findMy(user.userId ?? user.sub, parseInt(page, 10), parseInt(limit, 10));
  }

  // User fetches one order
  @Get(':id')
  getOne(@CurrentUser() user: any, @Param('id', ParseIntPipe) id: number) {
    return this.service.findOneForUser(user.userId ?? user.sub, id);
  }

  // Admin updates order status
  @Patch(':id/status')
  updateStatus(
    @CurrentUser() user: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ) {
    if (user.role !== 'admin') {
      throw new ForbiddenException('Admin only');
    }
    return this.service.updateStatus(id, dto.status);
  }
}
