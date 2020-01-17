import { Utils } from "./utils";
export class HandlePages {
    constructor() {
        this.utils = new Utils();

        this.navbarButtons = document.querySelectorAll('.nav-bar');
        this.allPages = document.querySelectorAll('.all-pages');

        this.registerEvents();
    }

    registerEvents() {
        this.navbarButtons.forEach( (navbarButton) => {
            navbarButton.onclick = (e) => this.showElement(e);
        });
    }

    showElement(e) {
        const dataSelect = e.target.getAttribute("data-select");

        this.hideAllPages();

        this.showPage(dataSelect);
    }

    hideAllPages() {
        for (const element of this.allPages) {
            element.style.display = 'none';
        }
    }

    showPage(dataSelect) {
        const pages = document.querySelectorAll(`[data-select=${dataSelect}]`) ;

        pages.forEach((page) => {
            page.style.display = "inline-block";
        });
    }

    hideNavBar() {

    }

    addButtonLogout() {
        
    }
}