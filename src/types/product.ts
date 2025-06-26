export interface ProductImage {
    id: number;
    url: string;
  }
  
  export interface Category {
    id: number;
    categoryName: string;
  }
  
  export interface Product {
    id: number;
    productName: string;
    productDescription: string;
    price: number;
    images: ProductImage[];
    categories: Category[];
  }