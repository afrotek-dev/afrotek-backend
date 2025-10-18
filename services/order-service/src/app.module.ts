import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { DatabaseModule } from '@afrotek/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    OrderModule,
  ],
})
export class AppModule {}
