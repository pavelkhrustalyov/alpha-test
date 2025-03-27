import { ICategory } from "./ICategory";

export interface IProduct {
    id: number;
    title: string;
    slug: string;
    price: number;
    description: string;
    category: ICategory;
    images: string[];
    creationAt: string;
    updatedAt: string;
    isFavorites?: boolean;
}