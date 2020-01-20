
export class Loading {
    constructor() {
        this.loading = document.querySelector('#container-loading');
    }

    handleLoading() {
        this.loading.classList.toggle("d-none");
    }
};