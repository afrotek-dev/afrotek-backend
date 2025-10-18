import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const u = await this.repo.findOne({ where: { id } });
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  async update(id: number, patch: Partial<User>) {
    const user = await this.findOne(id);
    Object.assign(user, patch);
    return this.repo.save(user);
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }
}
