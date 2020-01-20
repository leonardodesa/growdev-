import alertify from "alertifyjs";
export class Utils {
    constructor() {
        // this.url = 'https://aplication-jwt-growdev.herokuapp.com/';
        this.url = "http://localhost:8000/";
    }

    alertify(time, message, status) {
        alertify.set('notifier', 'delay', time);
        alertify.set('notifier', 'position', 'top-right');

        status == 200 ? alertify.success(message) : alertify.error(message);
    }
}