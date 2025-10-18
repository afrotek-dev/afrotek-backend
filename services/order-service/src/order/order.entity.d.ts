export declare enum OrderStatus {
    PENDING = "pending",
    PAID = "paid",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    RETURNED = "returned",
    CANCELLED = "cancelled"
}
export declare class Order {
    id: number;
    userId: number;
    productId: number;
    status: OrderStatus;
    totalPrice: string;
    currency: string;
    paymentMethod?: string;
    trackingCode?: string;
    productName?: string;
    productBrand?: string;
    productGrade?: string;
    productImage?: string;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=order.entity.d.ts.map