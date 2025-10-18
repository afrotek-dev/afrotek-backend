
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum ProductCategory {
  PHONE = 'phone',
  LAPTOP = 'laptop',
  TABLET = 'tablet',
  ACCESSORY = 'accessory',
  OTHER = 'other',
}

export enum ProductGrade {
  A = 'A', // like new
  B = 'B', // excellent
  C = 'C', // good
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  sku: string; // unique code

  @Index()
  @Column()
  name: string; // listing title (e.g., "iPhone 12 128GB")

  @Index()
  @Column()
  brand: string; // Apple, Samsung, Dell, etc.

  @Column({ nullable: true })
  model?: string; // iPhone 12, Galaxy S21, XPS 13

  @Column({
    type: 'enum',
    enum: ProductCategory,
    default: ProductCategory.PHONE,
  })
  category: ProductCategory;

  @Column({
    type: 'enum',
    enum: ProductGrade,
    default: ProductGrade.B,
  })
  grade: ProductGrade; // A/B/C — cosmetic condition

  @Column({ nullable: true })
  condition?: string; // extra notes (battery health %, minor scuffs, etc.)

  @Column({ type: 'int', nullable: true })
  storage_gb?: number;

  @Column({ nullable: true })
  color?: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  price_amount: string; // store as string from DB decimal

  @Column({ length: 3, default: 'ZAR' })
  price_currency: string;

  @Column({ type: 'int', default: 12 })
  warranty_months: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'simple-array', nullable: true })
  tags?: string[]; // e.g., "5G,bundle,open-box"

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'jsonb', nullable: true })
  images?: { url: string; alt?: string }[];

  @Column({ type: 'int', nullable: true })
  inspection_score?: number; // 0–100

  @Column({ nullable: true })
  inspection_report_url?: string; // S3 link

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
