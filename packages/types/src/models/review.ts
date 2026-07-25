export interface Review {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface CreateReviewInput {
  productId: string;
  rating: number;
  comment: string;
}