export namespace IEntity {
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
    export interface Products {
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
}
  