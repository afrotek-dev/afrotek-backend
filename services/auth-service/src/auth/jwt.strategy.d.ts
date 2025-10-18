import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: unknown[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(config: ConfigService);
    validate(payload: {
        sub: number;
        email: string;
        role?: string;
    }): Promise<{
        sub: number;
        email: string;
        role?: string;
    }>;
}
export {};
//# sourceMappingURL=jwt.strategy.d.ts.map