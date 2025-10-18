import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index
} from 'typeorm';

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  RETURNED = 'returned',
  CANCELLED = 'cancelled',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column()
  userId!: number;

  // we reference product by id (microservice boundary), keep snapshot fields
  @Index()
  @Column()
  productId!: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status!: OrderStatus;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  totalPrice!: string; // store as string for precision

  @Column({ default: 'ZAR' })
  currency!: string;

  @Column({ nullable: true })
  paymentMethod?: string; // 'paystack', 'card', etc.

  @Column({ nullable: true })
  trackingCode?: string;

  // product snapshot (denormalized for history)
  @Column({ nullable: true })
  productName?: string;

  @Column({ nullable: true })
  productBrand?: string;

  @Column({ nullable: true })
  productGrade?: string;

  @Column({ nullable: true })
  productImage?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
