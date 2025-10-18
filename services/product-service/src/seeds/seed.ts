import { DataSource } from 'typeorm';
import { Product, ProductCategory, ProductGrade } from '../product/product.entity';
import 'dotenv/config';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  entities: [Product],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(Product);

  const products = [
    {
      sku: 'IP12-128-BLK',
      name: 'iPhone 12 128GB Black',
      brand: 'Apple',
      model: 'iPhone 12',
      category: ProductCategory.PHONE,
      grade: ProductGrade.A,
      condition: 'Like new, 92% battery health',
      storage_gb: 128,
      color: 'Black',
      price_amount: '8999.00',
      price_currency: 'ZAR',
      warranty_months: 12,
      stock: 8,
      tags: ['5G', 'FaceID'],
      inspection_score: 95,
    },
    {
      sku: 'MBP-13-2020',
      name: 'MacBook Pro 13" 2020',
      brand: 'Apple',
      model: 'MacBook Pro 2020',
      category: ProductCategory.LAPTOP,
      grade: ProductGrade.B,
      price_amount: '14499.00',
      price_currency: 'ZAR',
      warranty_months: 6,
      stock: 3,
      inspection_score: 88,
    },
  ];

  await repo.save(products);
  console.log('Seed complete.');
  process.exit(0);
}

seed();
