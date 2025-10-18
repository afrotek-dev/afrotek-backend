import { OrderStatus } from '../order.entity';
export declare class CreateOrderDto {
    productId: number;
    totalPrice: string;
    currency?: string;
    paymentMethod?: string;
    productName?: string;
    productBrand?: string;
    productGrade?: string;
    productImage?: string;
    status?: OrderStatus;
}
//# sourceMappingURL=create-order.dto.d.ts.map