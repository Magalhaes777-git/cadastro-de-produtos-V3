
class Produto {
    constructor(nome, preco, quantidade) {
        this.nome = nome;
        this.preco = parseFloat(preco);
        this.quantidade = parseInt(quantidade);
    }

  
    calcularSubtotal() {
        return this.preco * this.quantidade;
    }
}


const listaDeProdutos = [];


const CHAVE_STORAGE = "sistema_estoque_produtos";


function salvarNoLocalStorage() {
  
    const listaEmTexto = JSON.stringify(listaDeProdutos);
    localStorage.setItem(CHAVE_STORAGE, listaEmTexto);
}


function carregarDoLocalStorage() {
    const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);

    
    if (dadosSalvos) {
       
        const produtosObjetos = JSON.parse(dadosSalvos);

        produtosObjetos.forEach((prod) => {
            const produtoInstanciado = new Produto(prod.nome, prod.preco, prod.quantidade);
            listaDeProdutos.push(produtoInstanciado);
        });
    }
}


const formProduto = document.getElementById("produto-form");
const btnLimparTudo = document.getElementById("limpar-tabela");
const totalEstoqueEl = document.getElementById("total-estoque");


formProduto.addEventListener("submit", function (event) {
    event.preventDefault();

    const nomeInput = document.getElementById("nome").value;
    const precoInput = document.getElementById("preco").value;
    const quantidadeInput = document.getElementById("quantidade").value;

    const novoProduto = new Produto(nomeInput, precoInput, quantidadeInput);

    listaDeProdutos.push(novoProduto);

    salvarNoLocalStorage();

    atualizarInterface();
    formProduto.reset();
});


btnLimparTudo.addEventListener("click", function () {
    if (listaDeProdutos.length === 0) {
        alert("A tabela já está vazia!");
        return;
    }

    if (confirm("Tem certeza que deseja remover todos os produtos?")) {
        listaDeProdutos.length = 0;

       
        localStorage.removeItem(CHAVE_STORAGE);

        atualizarInterface();
    }
});



function removerProduto(index) {
    listaDeProdutos.splice(index, 1);

    salvarNoLocalStorage();

    atualizarInterface();
}


function atualizarTotalEstoque() {
    const total = listaDeProdutos.reduce((acc, produto) => {
        return acc + produto.calcularSubtotal();
    }, 0);

    totalEstoqueEl.textContent = `Total em Estoque: R$ ${total.toFixed(2)}`;
}


function renderizarTabela() {
    const tabelaBody = document.querySelector("#tabela-produtos tbody");

    tabelaBody.innerHTML = "";

    listaDeProdutos.forEach((produto, index) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.calcularSubtotal().toFixed(2)}</td>
            <td>
                <button class="btn-remover">Remover</button>
            </td>
        `;

        const btnRemover = linha.querySelector(".btn-remover");
        btnRemover.addEventListener("click", () => removerProduto(index));

        tabelaBody.appendChild(linha);
    });
}


function atualizarInterface() {
    renderizarTabela();
    atualizarTotalEstoque();
}


carregarDoLocalStorage();
atualizarInterface();