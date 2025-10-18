import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: CreateUserDto): Promise<Omit<User, 'password'>>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    me(user: {
        sub: number;
        email: string;
    }): {
        sub: number;
        email: string;
    };
}
//# sourceMappingURL=auth.controller.d.ts.map