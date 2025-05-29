import { StockValidator } from "./classValidator/stockValidator";
import { EmailValidator, PasswordValidator, UserValidator } from "./classValidator/UserValidator";


const userChain = new UserValidator()
userChain.setnext(new EmailValidator()).setnext(new PasswordValidator())
//aqui solo esta usando la cadena de usuario y el email para otras cadenas hay que crear otra

console.log(userChain.handle({username:``,email:`hohlhohoh`, password:`` }))

const paymentChain = new payma