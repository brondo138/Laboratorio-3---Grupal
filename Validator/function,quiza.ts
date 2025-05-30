import { PaypalValidator } from "./classValidator/paypalValidator";
import { StockValidator } from "./classValidator/stockValidator";
import { EmailValidator, PasswordValidator, UserValidator } from "./classValidator/UserValidator";


const userChain = new UserValidator()
userChain.setNext(new EmailValidator()).setNext(new PasswordValidator())
//aqui solo esta usando la cadena de usuario y el email para otras cadenas hay que crear otra

console.log(userChain.handle({username:``,email:`hohlhohoh`, password:`` }))

const paymentChain = new PaypalValidator
paymentChain.setNext(new)