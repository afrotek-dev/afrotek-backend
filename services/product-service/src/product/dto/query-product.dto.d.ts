import { ProductCategory, ProductGrade } from '../product.entity';
export declare class QueryProductDto {
    q?: string;
    brand?: string;
    category?: ProductCategory;
    grade?: ProductGrade;
    page?: number;
    limit?: number;
    sort?: 'price_asc' | 'price_desc' | 'newest';
}
//# sourceMappingURL=query-product.dto.d.ts.map