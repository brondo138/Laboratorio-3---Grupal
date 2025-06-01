import { ProductInterface } from "../interfaces/productInterface";

export class Product implements ProductInterface {
    private basePrice: number;
    private tax: number;
    public price: number;

    constructor(public id: string, public name: string, price: number, public description: string, public stock: number, public images: string[], public offert: number, public taxRate: number) {
        this.basePrice = price;
        this.tax = this.basePrice * (this.taxRate / 100);
        this.price = this.basePrice + this.tax;
    }

    getPriceWithDiscount(): number {
        if (this.offert > 0) {
            const discount = (this.offert / 100) * this.price;
            return this.price - discount;
        }
        return this.price;
    }

    showInfo(): void {
        console.log(`\nProducto: ${this.name}`);
        
        console.log("Imágenes:");
        this.images.forEach((img, index) => {
            console.log(`  ${index + 1}. ${img}`);
        });

        console.log(`Descripción: ${this.description}`);
        console.log(`Disponibilidad: ${this.stock > 0 ? this.stock + " disponibles" : "Agotado"}`);
        
        if (this.offert > 0) {
            const precioFinal = this.getPriceWithDiscount();
            console.log(`Oferta del ${this.offert}%`);
            console.log(`Precio original: $${this.price.toFixed(2)}`);
            console.log(`Precio con discount: $${precioFinal.toFixed(2)}`);
        } else {
            console.log(`Precio: $${this.price.toFixed(2)}`);
        }
    }

    // Métodos útiles para la factura
    getTax(): number {
        return this.tax;
    }

    getBasePrice(): number {
        return this.basePrice;
    }
}


