import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UserService {
    private readonly repo;
    constructor(repo: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, patch: Partial<User>): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}
//# sourceMappingURL=user.service.d.ts.map