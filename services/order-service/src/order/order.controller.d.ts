import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
export declare class OrderController {
    private readonly service;
    constructor(service: OrderService);
    create(user: any, dto: CreateOrderDto): Promise<import("./order.entity").Order[]>;
    listMy(user: any, page?: string, limit?: string): Promise<{
        items: import("./order.entity").Order[];
        total: number;
        page: number;
        limit: number;
    }>;
    getOne(user: any, id: number): Promise<import("./order.entity").Order>;
    updateStatus(user: any, id: number, dto: UpdateStatusDto): Promise<import("./order.entity").Order>;
}
//# sourceMappingURL=order.controller.d.ts.map