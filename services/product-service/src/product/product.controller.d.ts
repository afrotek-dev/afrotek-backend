import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
export declare class ProductController {
    private readonly service;
    private readonly config;
    private readonly s3;
    private readonly logger;
    constructor(service: ProductService, config: ConfigService, s3: S3Client);
    create(dto: CreateProductDto, user?: any): Promise<import("./product.entity").Product>;
    list(q: QueryProductDto): Promise<{
        items: import("./product.entity").Product[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    get(id: number): Promise<import("./product.entity").Product>;
    update(id: number, dto: UpdateProductDto): Promise<import("./product.entity").Product>;
    remove(id: number): Promise<import("./product.entity").Product>;
    getPresignedUrl(id: number): Promise<{
        upload_url: string;
        key: string;
    }>;
}
//# sourceMappingURL=product.controller.d.ts.map