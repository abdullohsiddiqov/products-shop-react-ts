import exp from "constants";

export interface UserSignIn {
    avatarFile: IFile;
    name: string;
    email: string;
    password?: string;
    avatar?: string;
}
export interface IFile {
    file: File;
}
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}
export interface UsersForAdmin{ 
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar: string;
    creationAt: string;
    updatedAt: string;
}