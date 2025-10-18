import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class AuthService implements OnModuleInit {
    private readonly users;
    private readonly jwt;
    private readonly config;
    constructor(users: Repository<User>, jwt: JwtService, config: ConfigService);
    onModuleInit(): Promise<void>;
    register(dto: CreateUserDto): Promise<User>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map