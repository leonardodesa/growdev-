import axios from 'axios';
import { Loading } from "./loading";
import { Utils } from "./utils";
import { HandlePages } from "./handlePages";

var config;
var userInfo;

export class Recado {
    constructor() {
        this.buttonCreate = document.getElementById("btn_create");
        this.buttonEdit = document.getElementById("btn_edit");

        this.title = document.getElementById("title");
        this.content = document.getElementById("content");

        this.loading = new Loading();
        this.utils = new Utils();
        this.handlePages = new HandlePages();

        this.cardEditing = null;

        this.registerEvents();
    }

    registerEvents() {
        this.buttonCreate.onclick = (event) => this.createCard(event);
        this.buttonEdit.onclick = (event) => this.editCard(event);
    }

    checkIfUserExists() {
        return JSON.parse(sessionStorage.getItem("user"));
    }

    async getResults() {
        try {
            userInfo = this.checkIfUserExists();

            config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            };

            const { data } = await axios.get(`${this.utils.url}cards`, config);

            this.loading.handleLoading();

            this.recoveryScraps(data);
        } catch (e) {
            this.utils.alertify(2, "Erro na encontrar os card", 500);
        }
    }

    recoveryScraps(data) {
        for (const item of data) {
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

        if (this.title.value && this.content.value) {
            this.sendToServer();
        } else {
            alert("Preencha os campos!");
        }
    }

    async sendToServer() {
        userInfo = this.checkIfUserExists();

        config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        console.log(this);
        

        if (userInfo) {
            const payload = {
                title: this.title.value,
                content: this.content.value,
            }

            try {
                const { data } = await axios.post(`${this.utils.url}cadastro-cards`, {
                    payload,
                    config
                });

                let html = this.cardLayout(data.id, data.title, data.content);

                this.insertHtml(html);

                this.clearForm();

                this.registerButtons();

            } catch (error) {
                this.utils.alertify(2, "Erro na criação do card", 500);
            }
        } else {
            this.utils.alertify(2, "Faça login, ou registre-se!", 500);
        }

        this.loading.insertLoadingHtml();
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

    deleteCard = async (event) => {
        const id = event.path[3].getAttribute('scrap');

        try {
            const { data } = await axios.delete(`${this.utils.url}delete-cards/${id}`, {
                config
            });

            event.path[3].remove();
            this.utils.alertify(2, "Card excluido com sucesso");
        } catch (e) {
            this.utils.alertify(2, "Erro na encontrar os card", 500);
        }
    };

    openEditCard = (event) => {
        const id = event.path[3].getAttribute('scrap');

        const title = event.path[1].children[0].innerHTML;
        const content = event.path[1].children[1].innerHTML;

        if (title && content) {
            document.getElementById("edit_title").value = title;
            document.getElementById("edit_content").value = content;

            this.cardEditing = event.path[1];
            this.cardEditing.editId = id;
        } else {
            this.utils.alertify(2, "Preencha todas as informações", 500);
        }

    };

    editCard = async (event) => {
        const id = this.cardEditing.editId;
        const title = document.getElementById("edit_title").value;
        const content = document.getElementById("edit-content").value;

        if (title && content) {
            try {
                let payload = {
                    title,
                    content
                }
                const { data } = await axios.put(`${this.utils.url}update-cards/${id}`, {
                    payload,
                    config
                });

                this.cardEditing.children[0].innerHTML = title;
                this.cardEditing.children[1].innerHTML = content;

                this.utils.alertify(2, "Card atualizado com sucesso");
            } catch (e) {
                this.utils.alertify(2, "Erro ao atualizar o card", 500);
            }
        } else {
            this.utils.alertify(2, "Informe todos os campos", 500);
        }
    }
}