import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from '@afrotek/common';
import { HealthController } from './health.controller';

@Module({
  imports: [
  ConfigModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController, HealthController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
