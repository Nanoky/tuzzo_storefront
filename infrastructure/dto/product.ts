export interface ProductDTO {
    currency?: string;
    description?: string;
    isDeleted?: boolean;
    isPublished?: boolean;
    name: string;
    on_sale?: boolean;
    price: number;
    product_categories?: string[];
    product_images?: string[];
    quantity?: number;
    sale_price?: number;
    total_unit_sold?: number;
}
