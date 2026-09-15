class Produto {
   
    #nome;
    #preco;
    #quantidade;

    constructor(nome, preco, quantidade) {
        const precoNum = parseFloat(preco);
        const quantidadeNum = parseInt(quantidade);

      
        if (!nome || nome.trim() === "") {
            throw new Error("O nome do produto não pode ficar em branco!");
        }

        if (isNaN(precoNum) || precoNum <= 0) {
            throw new Error("O preço deve ser um número maior que zero!");
        }

        if (isNaN(quantidadeNum) || quantidadeNum <= 0) {
            throw new Error("A quantidade deve ser um número maior que zero!");
        }

        this.#nome = nome;
        this.#preco = precoNum;
        this.#quantidade = quantidadeNum;
    }

   
    get nome() {
        return this.#nome;
    }

    get preco() {
        return this.#preco;
    }

    get quantidade() {
        return this.#quantidade;
    }

    calcularSubtotal() {
        return this.#preco * this.#quantidade;
    }
}


const listaDeProdutos = [];


const formProduto = document.getElementById("produto-form");
const btnLimparTabela = document.getElementById("limpar-tabela");


formProduto.addEventListener("submit", function (event) {
    event.preventDefault();

    try {
        const nomeInput = document.getElementById("nome").value;
        const precoInput = document.getElementById("preco").value;
        const quantidadeInput = document.getElementById("quantidade").value;

        const novoProduto = new Produto(nomeInput, precoInput, quantidadeInput);

        listaDeProdutos.push(novoProduto);

        renderizarTabela();
        formProduto.reset();
    } catch (error) {
        alert(error.message);
    }
});


if (btnLimparTabela) {
    btnLimparTabela.addEventListener("click", function () {
        if (listaDeProdutos.length === 0) return;

        listaDeProdutos.length = 0; 
        renderizarTabela();
    });
}


function removerProduto(index) {
    listaDeProdutos.splice(index, 1);
    renderizarTabela();
}


function atualizarTotalEstoque() {
    const elementoTotal = document.getElementById("total-estoque");

    if (!elementoTotal) return;

    const valorTotal = listaDeProdutos.reduce((acumulador, produto) => {
        return acumulador + produto.calcularSubtotal();
    }, 0);

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
                <button class="btn-remover" onclick="removerProduto(${index})">Remover</button>
            </td>
        `;

        tabelaBody.appendChild(linha);
    });

  
    atualizarTotalEstoque();
}