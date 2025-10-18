import { Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrderService {
    private repo;
    constructor(repo: Repository<Order>);
    create(userId: number, dto: CreateOrderDto): Promise<Order[]>;
    findMy(userId: number, page?: number, limit?: number): Promise<{
        items: Order[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOneForUser(userId: number, id: number): Promise<Order>;
    updateStatus(id: number, status: OrderStatus): Promise<Order>;
    adminListAll(page?: number, limit?: number): Promise<{
        items: Order[];
        total: number;
        page: number;
        limit: number;
    }>;
}
//# sourceMappingURL=order.service.d.ts.map