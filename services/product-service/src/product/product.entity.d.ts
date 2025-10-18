export declare enum ProductCategory {
    PHONE = "phone",
    LAPTOP = "laptop",
    TABLET = "tablet",
    ACCESSORY = "accessory",
    OTHER = "other"
}
export declare enum ProductGrade {
    A = "A",// like new
    B = "B",// excellent
    C = "C"
}
export declare class Product {
    id: number;
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
    is_active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=product.entity.d.ts.map