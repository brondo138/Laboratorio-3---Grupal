import { generateID } from "../functions/generateID";
import { CategoryInterface } from "../interfaces/categoryInterface";
import { ProductInterface } from "../interfaces/productInterface";
import { editProductMenu } from "../view/editProductMenu";
import { Product } from "./product";
import { questionNumber, questionString } from "./readline";

export class Category implements CategoryInterface{
    constructor(public id: string, public name: string){}

    products:ProductInterface[] = [];

    generateUniqueId(): string{
            let nuevoId: string;
            
            do {
                nuevoId = generateID();
            } while (this.products.some(user => user.id === nuevoId));
            return nuevoId;
        }

    async create(): Promise<void> {
        const id = this.generateUniqueId();
    
        const name = await questionString("Ingrese el nombre del producto: ");
        const description = await questionString("Ingrese la descripción del producto: ");
    
        const price = await questionNumber("Ingrese el precio del producto: ");
        if (isNaN(price) || price < 0) {
            console.error("Error: Ingrese un valor válido para el precio del producto");
            return;
        }
    
        const stock = await questionNumber("Ingrese la cantidad disponible del producto: ");
        if (isNaN(stock) || stock < 0) {
            console.error("Error: Ingrese un valor válido para el stock del producto");
            return;
        }
    
        const imagesAmount = await questionNumber("Ingrese la cantidad de imágenes que tendrá el producto: ");
        if (isNaN(imagesAmount) || imagesAmount <= 0) {
            console.error("Error: El producto debe tener al menos una imagen");
            return;
        }
    
        const images: string[] = [];
        for (let i = 0; i < imagesAmount; i++) {
            const img = await questionString(`Ingrese la imagen #${i + 1}: `);
            images.push(img);
        }
    
        const offert = await questionNumber("Ingrese el descuento aplicado al producto (0% - 100%): ");
        if (isNaN(offert) || offert < 0 || offert > 100) {
            console.error("Error: Ingrese un número entre 0 y 100 para el descuento");
            return;
        }
    
        const taxRate = await questionNumber("Ingrese el porcentaje de impuesto aplicado al producto (ej: 13): ");
        if (isNaN(taxRate) || taxRate < 0) {
            console.error("Error: Ingrese un valor válido para el impuesto");
            return;
        }
    
        this.products.push(new Product(id, name, price, description, stock, images, offert, taxRate));
        console.log(`Producto "${name}" creado correctamente.`);
    }

    async edit(id: string): Promise<void> {
        const product = this.products.find(product => product.id === id);
        
        if (product) {
            const option = await editProductMenu();
        
            switch (option) {
                case 1:
                    const newName = await questionString("Ingrese el nuevo nombre del producto: ");
                    const newDescription = await questionString("Ingrese la nueva descripcion del producto: ");
                    product.name = newName;
                    product.description = newDescription;
                    console.log("Producto actualizado correctamente");
                    break;
                case 2:
                    const newPrice = await questionNumber(`Ingrese el nuevo precio base del producto (Actual $${product.getBasePrice().toFixed(2)}): `);
                    if (isNaN(newPrice) || newPrice < 0) {
                        console.error("Error: Ingrese un valor válido para el precio del producto");
                        return;
                    }
                
                    const newTaxRate = await questionNumber(`Ingrese el nuevo porcentaje de impuesto (Actual ${product.taxRate}%): `);
                    if (isNaN(newTaxRate) || newTaxRate < 0) {
                        console.error("Error: Ingrese un valor válido para el impuesto");
                        return;
                    }
                
                    // Recalcular precio final con impuesto
                    const newTax = newPrice * (newTaxRate / 100);
                    const newFinalPrice = newPrice + newTax;
                
                    // Actualizar valores
                    (product as any).precioBase = newPrice;
                    (product as any).impuesto = newTax;
                    product.price = newFinalPrice;
                    product.taxRate = newTaxRate;
                
                    console.log("Precio e impuesto actualizados correctamente");
                    break;
                    
                case 3:
                    const newOffert = await questionNumber(`Ingresa el nuevo descuento para el producto (Actual ${product.offert}%): `);
                    
                    if (isNaN(newOffert)) {
                        console.error("Error: Ingrese un valor valido para la oferta del producto");
                        return;
                    }
                    if (newOffert < 0 || newOffert > 100) {
                        console.error("Error: Ingrese un número válido entre 0 y 100");
                        return;
                    }    

                    product.offert = newOffert;
                    console.log("Producto actualizado correctamente");
                    break;
                case 4:
                    const imagesAmount = await questionNumber("Ingresa la cantidad de imagenes que ingresara: ");
        
                    if (isNaN(imagesAmount)) {
                        console.error("Error: Ingrese un valor valido para la cantidad de imagenes que tendra el producto");
                        return;
                    }
                    if (imagesAmount<= 0) {
                        console.error("Error: El producto debe tener al menos una imagen");
                        return;
                    }
                    
                    const newImages:string[] =[];
                    for (let i = 0; i < imagesAmount; i++) {
                        const img = await questionString("Ingrese la imagen: ");
                        newImages.push(img);
                    }

                    product.images = newImages;
                    console.log("Producto actualizado correctamente");
                    break;
                case 5:
                    const newStock = await questionNumber("Ingrese la cantidad disponible del producto: ");

                    if (isNaN(newStock)) {
                        console.error("Error: Ingrese un valor valido en la cantidad del producto");
                        return;
                    }

                    product.stock = newStock;
                    console.log("Producto actualizado correctamente");
                    break;
                case 6:
                    return;
                    break;
            
                default:
                    break;
            }
        }else{
            console.error("Error: Producto no encontrado.");
        }
    }

    showAll(): void {
        for (let i = 0; i < this.products.length; i++) {
            console.log(`${i+1}. ${this.products[i].name}`);
        }
    }

    showAllAdmin():void{
        for (let i = 0; i < this.products.length; i++) {
            console.log(`${i+1}. ID: ${this.products[i].id}, Nombre:${this.products[i].name}`);
        }
    }

    delete(id: string): void{
        const product = this.products.find(product => product.id === id);

        if (product) {
            this.products = this.products.filter(product => product.id !== id);
            console.log("Producto eliminado correctamente.");
        }else{
            console.error("Error: Producto no encontrado.");
        }
    }
}