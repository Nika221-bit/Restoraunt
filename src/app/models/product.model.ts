export interface Product {
  id: number;
  name: string;
  price: number;
  nuts?: boolean;
  image: string;
  vegeterian?: boolean;
  spiciness?: number;
  categoryId?: number;
}

export interface Basket {
  quantity: number;
  price: number;
  product: Product;
}
