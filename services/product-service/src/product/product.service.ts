
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async findAll(query: QueryProductDto) {
    const { q, brand, category, grade, page = 1, limit = 12, sort = 'newest' } = query;

    const qb = this.repo.createQueryBuilder('p').where('p.is_active = true');

    if (brand) qb.andWhere('p.brand ILIKE :brand', { brand: `%${brand}%` });
    if (category) qb.andWhere('p.category = :category', { category });
    if (grade) qb.andWhere('p.grade = :grade', { grade });
    if (q) {
      qb.andWhere(
        '(p.name ILIKE :q OR p.model ILIKE :q OR p.sku ILIKE :q OR p.description ILIKE :q)',
        { q: `%${q}%` },
      );
    }

    // sorting
    if (sort === 'price_asc') qb.orderBy('p.price_amount', 'ASC');
    else if (sort === 'price_desc') qb.orderBy('p.price_amount', 'DESC');
    else qb.orderBy('p.createdAt', 'DESC'); // newest

    const skip = (page - 1) * limit;
    qb.skip(skip).take(limit);

    const [items, total] = await qb.getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, dto);
    return this.repo.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    product.is_active = false; // soft delete
    return this.repo.save(product);
  }
}
