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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_status_dto_1 = require("./dto/update-status.dto");
const common_2 = require("@afrotek/common");
let OrderController = class OrderController {
    service;
    constructor(service) {
        this.service = service;
    }
    // User creates an order (e.g., after checkout – Paystack will be integrated later)
    create(user, dto) {
        return this.service.create(user.userId ?? user.sub, dto);
    }
    // User lists their orders
    listMy(user, page = '1', limit = '12') {
        return this.service.findMy(user.userId ?? user.sub, parseInt(page, 10), parseInt(limit, 10));
    }
    // User fetches one order
    getOne(user, id) {
        return this.service.findOneForUser(user.userId ?? user.sub, id);
    }
    // Admin updates order status
    updateStatus(user, id, dto) {
        if (user.role !== 'admin') {
            throw new common_1.ForbiddenException('Admin only');
        }
        return this.service.updateStatus(id, dto.status);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "listMy", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_status_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "updateStatus", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('orders'),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map