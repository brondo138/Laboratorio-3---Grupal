import { ProductInterface } from "../interfaces/productInterface";

export class Product implements ProductInterface {
    private precioBase: number;
    private impuesto: number;
    public price: number;

    constructor(public id: string, public name: string, price: number, public description: string, public stock: number, public images: string[], public offert: number, public taxRate: number) {
        this.precioBase = price;
        this.impuesto = this.precioBase * (this.taxRate / 100);
        this.price = this.precioBase + this.impuesto;
    }

    getPrecioConDescuento(): number {
        if (this.offert > 0) {
            const descuento = (this.offert / 100) * this.price;
            return this.price - descuento;
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
            const precioFinal = this.getPrecioConDescuento();
            console.log(`Oferta del ${this.offert}%`);
            console.log(`Precio original: $${this.price.toFixed(2)}`);
            console.log(`Precio con descuento: $${precioFinal.toFixed(2)}`);
        } else {
            console.log(`Precio: $${this.price.toFixed(2)}`);
        }
    }

    // Métodos útiles para la factura
    getImpuesto(): number {
        return this.impuesto;
    }

    getPrecioBase(): number {
        return this.precioBase;
    }
}


