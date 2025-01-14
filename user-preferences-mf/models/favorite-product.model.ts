export interface FavoriteProduct {
  productId: number;
  productName: string;
  description: string;
  price: string;
  stock: number;
  categoryId: number;
  imageUrl: string;
  status: "ACTIVE" | "INACTIVE";
  creationDate: string;
  updateDate: string | null;
  favoriteProductId: number;
}

export class FavoriteProductFactory {
  static fromJson(json: any): FavoriteProduct {
    return {
      productId: json.product_id,
      productName: json.product_name,
      description: json.description,
      price: json.price,
      stock: json.stock,
      categoryId: json.category_id,
      imageUrl: json.image_url,
      status: json.status,
      creationDate: json.creation_date,
      updateDate: json.update_date,
      favoriteProductId: json.favorite_product_id,
    };
  }

  static toJson(model: FavoriteProduct): any {
    return {
      product_id: model.productId,
      product_name: model.productName,
      description: model.description,
      price: model.price,
      stock: model.stock,
      category_id: model.categoryId,
      image_url: model.imageUrl,
      status: model.status,
      creation_date: model.creationDate,
      update_date: model.updateDate,
      favorite_product_id: model.favoriteProductId,
    };
  }
}
