import { Controller, Get, Param, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '@afrotek/common';

@Controller()
export class UserController {
  constructor(private readonly users: UserService) {}

  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @Get('users')
  findAll() {
    return this.users.findAll();
  }

  @Get('users/:id')
  findOne(@Param('id') id: string) {
    return this.users.findOne(parseInt(id, 10));
  }

  @Patch('users/:id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.users.update(parseInt(id, 10), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/me')
  me(@Req() req: any) {
    return { user: req.user };
  }
}
