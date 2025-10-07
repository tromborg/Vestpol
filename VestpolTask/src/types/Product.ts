export type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: string;
  inStock: boolean;
  tags: string[];
  image: string;
  createdAt: string;
  description: string;
  specs: Record<string, string | number | string[] | number[] | undefined>;
};
