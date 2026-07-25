export interface Coupon {
  id: string;
  code: string;
  discount: number;
  validUntil: Date;
}

export interface CreateCouponInput {
  code: string;
  discount: number;
  validUntil: Date;
}