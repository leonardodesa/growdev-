import axios from 'axios';
import { Login } from './login';
import { Register } from './register';
import { HandlePages } from './handlePages';
import { Utils } from './utils';

export default class App {
    constructor() {
        this.login = new Login();
        this.register = new Register();
        this.handlePages = new HandlePages();
        this.utils = new Utils();
    
        // recados
        this.buttonCreate = document.getElementById("btn_create");
        this.buttonEdit = document.getElementById("btn_edit");

        this.title = document.getElementById("title");
        this.content = document.getElementById("content");

        this.cardEditing = null;

        this.registerEvents();
    }

    registerEvents() {
        this.buttonCreate.onclick = (event) => this.createCard(event);
        this.buttonEdit.onclick = (event) => this.editCard(event);
    }

    async getScraps(app) {
        const home = await axios.get(this.url + 'cards');

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
            this.sendToServer();
        } else {
            alert("Preencha os campos!");
        }
    }

    async sendToServer() {
        const userInfo = JSON.parse(sessionStorage.getItem("user"));

        if (userInfo) {
            const payload = {
                title: this.title.value,
                content: this.content.value,
            }
            const { id, title, content } = await axios.post(`${this.url}cadastro-cards`, payload);
            
            let html = this.cardLayout(id, title, content);
    
            this.insertHtml(html);   
    
            this.clearForm();
    
            this.registerButtons();
        } else {
            this.utils.alertify(2, "Faça login, ou registre-se!", 500);
        }
        // axios.post(this.url, {
        //         title: this.title.value,
        //         content: this.content.value
        //     })
        //     .then(function (response) {
        //         const {id, title, content} = response.data;
                // let html = app.cardLayout(id, title, content);
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