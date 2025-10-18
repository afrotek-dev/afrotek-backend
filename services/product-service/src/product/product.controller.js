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
var ProductController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const query_product_dto_1 = require("./dto/query-product.dto");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const config_1 = require("@nestjs/config");
const common_2 = require("@afrotek/common");
let ProductController = ProductController_1 = class ProductController {
    service;
    config;
    s3;
    logger = new common_1.Logger(ProductController_1.name);
    constructor(service, config, s3) {
        this.service = service;
        this.config = config;
        this.s3 = s3;
    }
    // ✅ Create product (protected, but fallback-safe if JWT is not set up yet)
    async create(dto, user) {
        try {
            // If auth not ready, log a notice instead of failing
            if (!user) {
                this.logger.warn('JWT strategy not initialized — creating product without user context (development mode).');
            }
            const product = await this.service.create(dto);
            return product;
        }
        catch (err) {
            this.logger.error('Error creating product', err.stack || err.message);
            throw err;
        }
    }
    // ✅ List products (public)
    list(q) {
        return this.service.findAll(q);
    }
    // ✅ Get one product (public)
    get(id) {
        return this.service.findOne(id);
    }
    // ✅ Update product (protected)
    async update(id, dto) {
        return this.service.update(id, dto);
    }
    // ✅ Soft delete product (protected)
    async remove(id) {
        return this.service.remove(id);
    }
    // ✅ Generate pre-signed S3 upload URL (protected)
    async getPresignedUrl(id) {
        const bucket = this.config.get('AWS_S3_BUCKET');
        if (!bucket) {
            this.logger.error('AWS_S3_BUCKET not set in environment variables.');
            throw new Error('S3 bucket not configured.');
        }
        const key = `products/${id}/${Date.now()}.jpg`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: bucket,
            Key: key,
            ContentType: 'image/jpeg',
        });
        const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 3600 });
        return { upload_url: url, key };
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_product_dto_1.QueryProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "get", null);
__decorate([
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, common_1.Post)(':id/images/presign'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getPresignedUrl", null);
exports.ProductController = ProductController = ProductController_1 = __decorate([
    (0, common_1.Controller)('products'),
    __param(2, (0, common_1.Inject)('S3_CLIENT')),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        config_1.ConfigService,
        client_s3_1.S3Client])
], ProductController);
//# sourceMappingURL=product.controller.js.map