"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const typeorm_1 = require("typeorm");
const order_entity_1 = require("../order/order.entity");
const ds = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [order_entity_1.Order],
    synchronize: true,
});
async function run() {
    await ds.initialize();
    const repo = ds.getRepository(order_entity_1.Order);
    const demo = repo.create({
        userId: 1,
        productId: 1,
        totalPrice: '2499.00',
        currency: 'ZAR',
        status: order_entity_1.OrderStatus.PENDING,
        productName: 'Demo Phone',
        productBrand: 'Afrotek',
        productGrade: 'A',
    });
    await repo.save(demo);
    console.log('[Order] Seed complete');
    process.exit(0);
}
run();
//# sourceMappingURL=seed.js.map