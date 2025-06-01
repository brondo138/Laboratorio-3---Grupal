export interface ProductInterface {
    id: string;
    name: string;
    price: number;               
    description: string;
    stock: number;
    images: string[];
    offert: number;
    taxRate: number;
    showInfo(): void;
    getBasePrice(): number;   
    getTax(): number;       
}
