// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InputListProductDto {}

type Product = {
  id: string;
  name: string;
  price: number;
};

export interface OutputListProductDto {
  products: Product[];
}
