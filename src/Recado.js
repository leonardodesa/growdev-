import axios from 'axios';
import { Loading } from "./loading";
import { Utils } from "./utils";
import { HandlePages } from "./handlePages";

var config;
var userInfo;
var cardEditing;

export class Recado {
    constructor() {
        this.buttonCreate = document.getElementById("btn_create");
        this.buttonEdit = document.getElementById("btn_edit");

        this.title = document.getElementById("title");
        this.content = document.getElementById("content");

        this.loading = new Loading();
        this.utils = new Utils();
        this.handlePages = new HandlePages();

        this.registerEvents();
    }

    registerEvents() {
        this.buttonCreate.onclick = (event) => this.createCard(event);
        this.buttonEdit.onclick = (event) => this.editCard(event);
    }

    checkIfUserExists() {
        return JSON.parse(sessionStorage.getItem("user"));
    }

    deleteCardsIfExists() {
        const cards = document.querySelectorAll('.scrap');

        for(const card of cards) {
            card.remove();
        }        
    }

    async getResults() {
        this.deleteCardsIfExists();
        try {
            userInfo = this.checkIfUserExists();

            config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            };

            this.loading.handleLoading();

            const { data } = await axios.get(`${this.utils.url}cards`, config);

            this.recoveryScraps(data);
        } catch (e) {
            this.utils.alertify(2, "Erro na encontrar os card", 500);
        }
        this.loading.handleLoading();
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
        this.utils.stopEvents(event);

        if (this.title.value && this.content.value) {
            this.sendToServer();
        } else {
            this.utils.alertify(2, "Preencha todos os campos!", 500);
        }
    }

    async sendToServer() {
        if (userInfo) {
            const payload = {
                title: this.title.value,
                content: this.content.value,
            }

            try {
                this.loading.handleLoading();

                const { data } = await axios.post(`${this.utils.url}cadastro-cards`,
                    payload,
                    config
                );

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

        this.loading.handleLoading();
    }

    cardLayout(id, title, content) {
        const html = `
            <div class="col-sm-4 scrap" scrap="${id}">
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
            this.loading.handleLoading();

            const { data } = await axios.delete(`${this.utils.url}delete-cards/${id}`,
                config
            );

            event.path[3].remove();
            this.utils.alertify(2, "Card excluido com sucesso!", 200);
        } catch (e) {
            this.utils.alertify(2, "Erro na encontrar os card", 500);
        }
        this.loading.handleLoading();
    };

    openEditCard = (event) => {
        const id = event.path[3].getAttribute('scrap');

        const title = event.path[1].children[0].innerHTML;
        const content = event.path[1].children[1].innerHTML;

        if (title && content) {
            document.getElementById("edit_title").value = title;
            document.getElementById("edit_content").value = content;

            cardEditing = event.path[1];
            cardEditing.editId = id;
        } else {
            this.utils.alertify(2, "Preencha todas as informações", 500);
        }

    };

    editCard = async (event) => {
        const id = cardEditing.editId;
        const title = document.getElementById("edit_title").value;
        const content = document.getElementById("edit_content").value;

        if (title && content) {
            try {
                let payload = {
                    title,
                    content
                }
        
                this.loading.handleLoading();

                const { data } = await axios.put(`${this.utils.url}update-cards/${id}`,
                    payload,
                    config
                );

                cardEditing.children[0].innerHTML = title;
                cardEditing.children[1].innerHTML = content;

                this.utils.alertify(2, "Card atualizado com sucesso", 200);
            } catch (e) {
                this.utils.alertify(2, "Erro ao atualizar o card", 500);
            }
            this.loading.handleLoading();
        } else {
            this.utils.alertify(2, "Informe todos os campos", 500);
        }
    }
}