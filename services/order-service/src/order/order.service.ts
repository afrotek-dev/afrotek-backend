import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

  async create(userId: number, dto: CreateOrderDto) {
    const order = this.repo.create({
      userId,
      productId: dto.productId,
      totalPrice: dto.totalPrice,
      currency: dto.currency ?? 'ZAR',
      paymentMethod: dto.paymentMethod ?? '',  // Ensure paymentMethod is always a string
      status: dto.status ?? OrderStatus.PENDING,
      productName: dto.productName ?? '',  // Add default empty string if undefined
      productBrand: dto.productBrand ?? '',  // Add default empty string if undefined
      productGrade: dto.productGrade ?? '',  // Add default empty string if undefined
      productImage: dto.productImage ?? '',  // Add default empty string if undefined
    });
    return this.repo.save(order);
  }

  async findMy(userId: number, page = 1, limit = 12) {
    const [items, count] = await this.repo.findAndCount({
      where: { userId } as FindOptionsWhere<Order>,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total: count, page, limit };
  }

  async findOneForUser(userId: number, id: number) {
    const order = await this.repo.findOne({ where: { id, userId } });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updateStatus(id: number, status: OrderStatus) {
    const order = await this.repo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    order.status = status;
    return this.repo.save(order);
  }

  async adminListAll(page = 1, limit = 20) {
    const [items, count] = await this.repo.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total: count, page, limit };
  }
}
