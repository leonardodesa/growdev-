
export class Loading {
    constructor() {
        this.loading = document.querySelector('#container-loading');
    }

    insertLoadingHtml() {
        this.loading.classList.toggle("d-none");
    }

    removeLoadingHtml() {
        this.loading.classList.toggle("d-none");
    }
};