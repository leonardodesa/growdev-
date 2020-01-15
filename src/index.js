const axios = require("axios");

class App {
    constructor() {
        this.login = document.getElementById('navbar-login');
        this.register = document.getElementById('navbar-register');
        this.allPages = document.querySelectorAll('.all-pages')

        this.buttonCreate = document.getElementById("btn_create");
        this.buttonEdit = document.getElementById("btn_edit");

        this.title = document.getElementById("title");
        this.content = document.getElementById("content");

        this.cardEditing = null;

        // this.url = 'https://aplication-jwt-growdev.herokuapp.com/';
        this.url = 'http://localhost:3030/';

        this.getScraps(this);
        this.registerEvents();
    }

    registerEvents() {
        this.buttonCreate.onclick = (event) => this.createCard(event);
        this.buttonEdit.onclick = (event) => this.editCard(event);
        this.login.onclick = (e) => this.showElement(e);
        this.register.onclick = e => this.showElement(e);
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
        console.log(dataSelect);
        const showPage = document.querySelectorAll(`[data-select=${dataSelect}]`);
        showPage[1].style.display = "block";
    }

    async getScraps(app) {
        const home = await axios.get(this.url + 'cards');

        console.log(home);

        // const scraps = (async function () {
        //     await console.log('ok');
        // })();
        // axios.get(this.url)
        //     .then(function (response) {
        //         app.recoveryScraps(response.data);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })
        //     .finally(function () {
        //     });
    }

    async teste() {
        const leo = "ok";
        return await leo;
    }

    recoveryScraps(data) {
        console.log(data);
        for(item of data) {
            const html = this.cardLayout(item.id, item.title, item.content);

            this.insertHtml(html);
        }

        this.registerButtons();
    }

    registerButtons() {
        document.querySelectorAll('.delete_card').forEach(item => {
            item.onclick = event => this.deleteCard(event);
        });

        document.querySelectorAll('.edit_card').forEach(item => {
            item.onclick = event => this.openEditCard(event);
        });
    }

    createCard(event) {
        event.preventDefault();

        if(this.title.value && this.content.value) {
            this.sendToServer(this);
        } else {
            alert("Preencha os campos!");
        }
    }

    sendToServer(app) {
        // axios.post(this.url, {
        //         title: this.title.value,
        //         content: this.content.value
        //     })
        //     .then(function (response) {
        //         const {id, title, content} = response.data;
                // let html = app.cardLayout(id, title, content);
                let html = app.cardLayout(1, app.title.value, app.content.value);

                app.insertHtml(html);   

                app.clearForm();

                app.registerButtons();
            // })
            // .catch(function (error) {
            //     console.log(error);
            //     alert("Ops! Tente novamente mais tarde.");
            // })
            // .finally(function () {
            // });
    }

    cardLayout(id, title, content) {
        const html = `
            <div class="col-sm-4" scrap="${id}">
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${content}</p>
                    <button type="button" class="btn btn-primary edit_card" data-toggle="modal" data-target="#editModal">
                        Editar
                    </button>
                    <button type="button" class="btn btn-danger delete_card">Excluir</button>
                    </div>
                </div>
            </div>
        `;

        return html;
    }

    insertHtml(html) {
        document.getElementById("container_card").innerHTML += html;
    }

    clearForm() {
        this.title.value = "";
        this.content.value = "";
    }

    deleteCard = (event) => {
        const id = event.path[3].getAttribute('scrap');
        
        axios.delete(`${this.url}${id}`)
            .then(function (response) {
                event.path[3].remove();
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            });
    };

    openEditCard = (event) => {
        const id = event.path[3].getAttribute('scrap');

        const title = event.path[1].children[0].innerHTML;
        const content = event.path[1].children[1].innerHTML;

        document.getElementById("edit_title").value = title;
        document.getElementById("edit_content").value = content;

        this.cardEditing = event.path[1];
        this.cardEditing.editId = id;
    };

    editCard = (event) => {
        const id = this.cardEditing.editId;
        const title = document.getElementById("edit_title").value;
        const content = document.getElementById("edit-content").value

        axios.put(`${this.url}${id}`, {
            title: title,
            content: content
        })
        .then( (response) => {
            this.cardEditing.children[0].innerHTML = title;
            this.cardEditing.children[1].innerHTML = content;
        })
        .catch(function (error) {
            console.log(error);
            alert("Ops! Tente novamente mais tarde.");
        })
        .finally(function () {
        }); 
    }

}

new App();