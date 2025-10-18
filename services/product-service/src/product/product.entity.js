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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.ProductGrade = exports.ProductCategory = void 0;
const typeorm_1 = require("typeorm");
var ProductCategory;
(function (ProductCategory) {
    ProductCategory["PHONE"] = "phone";
    ProductCategory["LAPTOP"] = "laptop";
    ProductCategory["TABLET"] = "tablet";
    ProductCategory["ACCESSORY"] = "accessory";
    ProductCategory["OTHER"] = "other";
})(ProductCategory || (exports.ProductCategory = ProductCategory = {}));
var ProductGrade;
(function (ProductGrade) {
    ProductGrade["A"] = "A";
    ProductGrade["B"] = "B";
    ProductGrade["C"] = "C";
})(ProductGrade || (exports.ProductGrade = ProductGrade = {}));
let Product = class Product {
    id;
    sku; // unique code
    name; // listing title (e.g., "iPhone 12 128GB")
    brand; // Apple, Samsung, Dell, etc.
    model; // iPhone 12, Galaxy S21, XPS 13
    category;
    grade; // A/B/C — cosmetic condition
    condition; // extra notes (battery health %, minor scuffs, etc.)
    storage_gb;
    color;
    price_amount; // store as string from DB decimal
    price_currency;
    warranty_months;
    stock;
    tags; // e.g., "5G,bundle,open-box"
    description;
    images;
    inspection_score; // 0–100
    inspection_report_url; // S3 link
    is_active;
    createdAt;
    updatedAt;
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "sku", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProductCategory,
        default: ProductCategory.PHONE,
    }),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProductGrade,
        default: ProductGrade.B,
    }),
    __metadata("design:type", String)
], Product.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "condition", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "storage_gb", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 2 }),
    __metadata("design:type", String)
], Product.prototype, "price_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 3, default: 'ZAR' }),
    __metadata("design:type", String)
], Product.prototype, "price_currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 12 }),
    __metadata("design:type", Number)
], Product.prototype, "warranty_months", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Product.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "inspection_score", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "inspection_report_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('products')
], Product);
//# sourceMappingURL=product.entity.js.map