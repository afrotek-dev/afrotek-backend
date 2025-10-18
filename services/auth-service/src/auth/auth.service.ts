import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async onModuleInit() {
    // Seed a default admin for development
    const adminEmail = this.config.get<string>('ADMIN_EMAIL') || 'admin@afrotek.dev';
    const adminPass = this.config.get<string>('ADMIN_PASSWORD') || 'Admin123!';
    const exists = await this.users.findOne({ where: { email: adminEmail } });

    if (!exists) {
      const hash = await bcrypt.hash(adminPass, 10);
      await this.users.save(
        this.users.create({
          email: adminEmail,
          password: hash,
          role: 'admin',
        }),
      );
      // eslint-disable-next-line no-console
      console.log(`[Auth] Seeded admin: ${adminEmail} / ${adminPass}`);
    }
  }

  async register(dto: CreateUserDto): Promise<User> {
    const existing = await this.users.findOne({ where: { email: dto.email } });
    if (existing) throw new BadRequestException('Email already registered');

    const password = await bcrypt.hash(dto.password, 10);
    const user = this.users.create({
      email: dto.email,
      password,
      role: 'user',
    });
    return this.users.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.users.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = await this.jwt.signAsync(payload);
    return { access_token };
  }
}
