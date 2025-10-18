import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Order, OrderStatus } from '../order/order.entity';

const ds = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',          // Default value if DB_HOST is undefined
  port: parseInt(process.env.DB_PORT || '5432', 10),  // Default value if DB_PORT is undefined
  username: process.env.DB_USER || 'user',            // Default value if DB_USER is undefined
  password: process.env.DB_PASS || '',                // Default value if DB_PASS is undefined
  database: process.env.DB_NAME || 'dbname',          // Default value if DB_NAME is undefined
  entities: [Order],
  synchronize: true,
});

async function run() {
  await ds.initialize();
  const repo = ds.getRepository(Order);

  const demo = repo.create({
    userId: 1,
    productId: 1,
    totalPrice: '2499.00',
    currency: 'ZAR',
    status: OrderStatus.PENDING,
    productName: 'Demo Phone',
    productBrand: 'Afrotek',
    productGrade: 'A',
  });

  await repo.save(demo);
  console.log('[Order] Seed complete');
  process.exit(0);
}

run();
