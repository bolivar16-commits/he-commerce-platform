export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export interface ProductFilterFormData {
  search?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
}