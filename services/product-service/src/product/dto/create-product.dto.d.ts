import { ProductCategory, ProductGrade } from '../product.entity';
export declare class CreateProductDto {
    sku: string;
    name: string;
    brand: string;
    model?: string;
    category: ProductCategory;
    grade: ProductGrade;
    condition?: string;
    storage_gb?: number;
    color?: string;
    price_amount: string;
    price_currency: string;
    warranty_months: number;
    stock: number;
    tags?: string[];
    description?: string;
    images?: {
        url: string;
        alt?: string;
    }[];
    inspection_score?: number;
    inspection_report_url?: string;
    is_active?: boolean;
}
//# sourceMappingURL=create-product.dto.d.ts.map