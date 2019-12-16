
function ListaPessoas( ) {
    this.pessoas = [];
    this.index = 0;
}

ListaPessoas.prototype = {

    addPessoa: function(id, nome, idade) {
	const pessoa = {};
        pessoa.id = id;
        pessoa.nome = nome;
        pessoa.idade = idade;

        this.pessoas.push(pessoa);
    },

    returnIdPessoa: function() {
        if (this.index > this.pessoas.length - 1) this.index = 0;
        return this.pessoas[this.index++].id;
    },

    imprimePessoa: function() {
        this.pessoas.map(pessoa => console.log('key id: ' + pessoa.id + ' nome: ' + pessoa.nome));
    }
}

function init() {
    let createPessoa = new ListaPessoas();
    createPessoa.addPessoa(1, "leo", 21);
    createPessoa.addPessoa(2, "joao", 22);
    createPessoa.addPessoa(3, "pedro", 23);

    let nextId = createPessoa.returnIdPessoa();
    console.log('nextId: ', nextId);

    createPessoa.imprimePessoa();
}

init();
