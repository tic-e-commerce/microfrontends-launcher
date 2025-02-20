export interface Product {
  product_id: number;
  product_name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  category_id: number;
  discount?: number;
  rating?: number;
  status: string;
  creation_date: string;
  update_date?: string | null;
}
