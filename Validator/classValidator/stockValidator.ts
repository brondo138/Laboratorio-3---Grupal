import { BaseValidator } from "../BaseValidator";

export class StockValidator extends BaseValidator{
    public handle(request: any): string {
        if(request === ``)
            return `No hay stock de este producto`

        return super.handle(request)
    }
}