import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly users;
    constructor(users: UserService);
    health(): {
        status: string;
    };
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, dto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    me(req: any): {
        user: any;
    };
}
//# sourceMappingURL=user.controller.d.ts.map