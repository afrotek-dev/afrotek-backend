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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./order.entity");
let OrderService = class OrderService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(userId, dto) {
        const order = this.repo.create({
            userId,
            productId: dto.productId,
            totalPrice: dto.totalPrice,
            currency: dto.currency ?? 'ZAR',
            paymentMethod: dto.paymentMethod,
            status: dto.status ?? order_entity_1.OrderStatus.PENDING,
            productName: dto.productName,
            productBrand: dto.productBrand,
            productGrade: dto.productGrade,
            productImage: dto.productImage,
        });
        return this.repo.save(order);
    }
    async findMy(userId, page = 1, limit = 12) {
        const [items, count] = await this.repo.findAndCount({
            where: { userId },
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        return { items, total: count, page, limit };
    }
    async findOneForUser(userId, id) {
        const order = await this.repo.findOne({ where: { id, userId } });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async updateStatus(id, status) {
        const order = await this.repo.findOne({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        order.status = status;
        return this.repo.save(order);
    }
    async adminListAll(page = 1, limit = 20) {
        const [items, count] = await this.repo.findAndCount({
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        return { items, total: count, page, limit };
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderService);
//# sourceMappingURL=order.service.js.map