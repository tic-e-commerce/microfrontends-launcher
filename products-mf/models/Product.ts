export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    discount?: number; // Opcional
    rating: number;
  }
  