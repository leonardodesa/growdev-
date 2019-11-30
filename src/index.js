
class App {
    constructor() {
        this.buttonCreate = document.getElementById('btn-create');
        this.titulo = document.getElementById("titulo");
        this.descricao = document.getElementById("descricao");
        this.registerEvents();
    }

    registerEvents() {
        this.buttonCreate.onclick = (event) => this.createCard(event);
    }

    createCard(event) {
        event.preventDefault();

        if(this.titulo || this.descricao) {
            const card = this.cardLayout(this.titulo.value, this.descricao.value);
            this.insertHTML(card);
            this.clearForm();
            this.addEventClickDelete();
        } else {
            alert("Preencha os campos");
        }
    }

    addEventClickDelete() {
        const buttons = document.querySelectorAll('.delete-button');

        buttons.forEach(item =>
            item.onclick = (event) =>
            this.deleteCard(event)
        ); 
    }

    deleteCard(event) {
        let card = event.path[5];
        card.remove();
    }

    clearForm() {
        this.titulo.value = "";
        this.descricao.value = "";
    }

    insertHTML(card) {
        document.getElementById('container-card').innerHTML += card;
    }

    cardLayout(titulo, descricao) {
        let card = `
            <div class="col-md-4">
                <div class="card mb-4 box-shadow">
                    <div class="card-header">
                        <h5 class="card-title">${titulo}</h5>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${descricao}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-danger delete-button"}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        return card;
    }
}

new App();