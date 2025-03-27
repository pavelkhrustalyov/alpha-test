import { IProduct } from "./IProduct";

export interface IProductState {
    productList: IProduct[];
    product: IProduct | null;
    isLoading: boolean;
    isError: boolean;
    offset: number;
    limit: number;
    hasMore: boolean;
}