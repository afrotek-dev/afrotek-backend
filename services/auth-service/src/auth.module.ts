import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@afrotek/common';

@Module({
  imports: [
  ConfigModule,
  DatabaseModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecretkey',
      signOptions: { expiresIn: parseInt(process.env.JWT_EXPIRES_IN || '86400', 10) }, // 24 hours in seconds
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
