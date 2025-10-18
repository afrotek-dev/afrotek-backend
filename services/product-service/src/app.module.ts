import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health/health.controller';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from '@afrotek/common'; // ✅ fixed import path

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule, // ✅ now properly re-exported from libs/common
    AuthModule,
    ProductModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
