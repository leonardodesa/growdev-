import { Login } from './login';
import { Register } from './register';
import { Recados } from './recados';

export default class App {
    constructor() {
        this.recados = new Recados();
        this.login = new Login(this.recados);
        this.register = new Register(this.recados);
    }
}

new App();