
let cont = 0;

function createRecado(titulo, descricao) {
    if(!titulo || !descricao) return alert('Preencha todos os campos;');

    let containerCard = document.querySelector("#container-card");
    cont++;
    let elementRecado = `
    <div class="col-md-4" id='card-${cont}' data-select=${cont}>
        <div class="card mb-4 box-shadow">
            <div class="card-header">
                <h5 class="card-title">${titulo}</h5>
            </div>
            <div class="card-body">
                <p class="card-text">${descricao}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" id="delete-recado-${cont}" data-select="${cont}" class="btn btn-danger delete-button"}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;    

    containerCard.innerHTML += elementRecado;

    let deleteButtons = document.querySelectorAll('.delete-button');
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', function (e) {
            preventDefaults(e);
            deleteRecado(e);
        });        
    }
}

function deleteRecado(e) {
    let getAtributeElement = e.target.getAttribute("data-select");
    let containerCardRemove = document.getElementById("card-" + getAtributeElement);
    
    containerCardRemove.remove();
}

function init() {
    addEventListenerButtonSubmit();
}

function addEventListenerButtonSubmit() {
    let buttonSubmitForm = document.querySelector('#criar-recado');
    let titulo = document.querySelector('#titulo');
    let descricao = document.querySelector('#descricao');

    buttonSubmitForm.addEventListener('click', function(e){
        preventDefaults(e);
        createRecado(titulo.value, descricao.value);
    });
}

function preventDefaults(e) {
    e.stopPropagation();
    e.preventDefault();
}

init();