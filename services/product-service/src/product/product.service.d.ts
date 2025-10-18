import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
export declare class ProductService {
    private readonly repo;
    constructor(repo: Repository<Product>);
    create(dto: CreateProductDto): Promise<Product>;
    findAll(query: QueryProductDto): Promise<{
        items: Product[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne(id: number): Promise<Product>;
    update(id: number, dto: UpdateProductDto): Promise<Product>;
    remove(id: number): Promise<Product>;
}
//# sourceMappingURL=product.service.d.ts.map