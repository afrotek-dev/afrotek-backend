import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly users;
    private readonly jwt;
    constructor(users: Repository<User>, jwt: JwtService);
    register(dto: RegisterDto): Promise<{
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map