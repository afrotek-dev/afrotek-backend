"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
let ProductService = class ProductService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const entity = this.repo.create(dto);
        return this.repo.save(entity);
    }
    async findAll(query) {
        const { q, brand, category, grade, page = 1, limit = 12, sort = 'newest' } = query;
        const qb = this.repo.createQueryBuilder('p').where('p.is_active = true');
        if (brand)
            qb.andWhere('p.brand ILIKE :brand', { brand: `%${brand}%` });
        if (category)
            qb.andWhere('p.category = :category', { category });
        if (grade)
            qb.andWhere('p.grade = :grade', { grade });
        if (q) {
            qb.andWhere('(p.name ILIKE :q OR p.model ILIKE :q OR p.sku ILIKE :q OR p.description ILIKE :q)', { q: `%${q}%` });
        }
        // sorting
        if (sort === 'price_asc')
            qb.orderBy('p.price_amount', 'ASC');
        else if (sort === 'price_desc')
            qb.orderBy('p.price_amount', 'DESC');
        else
            qb.orderBy('p.createdAt', 'DESC'); // newest
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
    async findOne(id) {
        const product = await this.repo.findOne({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async update(id, dto) {
        const product = await this.findOne(id);
        Object.assign(product, dto);
        return this.repo.save(product);
    }
    async remove(id) {
        const product = await this.findOne(id);
        product.is_active = false; // soft delete
        return this.repo.save(product);
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map