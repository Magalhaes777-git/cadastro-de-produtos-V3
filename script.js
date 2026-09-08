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

const listaDeProdutos = []

const formProduto = document.getElementById("produto-form")

formProduto.addEventListener("submit", function (event) {
    event.preventDefault()

    const nomeImput = document.getElementById("nome").value;
    const precoImput = document.getElementById("preco").value;
    const quantidadeImput = document.getElementById("quantidade").value;

    const novoProduto = new Produto(nomeImput, precoImput, quantidadeImput);

    listaDeProdutos.push(novoProduto);

    renderizarTabela();
    formProduto.reset();
})

function renderizarTabela() {
    const tabelaBody = document.querySelector("#tabela-produtos tbody");

    tabelaBody.innerHTML = "";

    listaDeProdutos.forEach((Produto) => {
        const linha = document.createElement("tr");

linha.innerHTML = `
<td>${Produto.nome}</td>
<td>R$ ${Produto.preco.toFixed(2)}</td>
<td>${Produto.quantidade}</td>
<td>R$ ${Produto.calcularSubtotal().toFixed(2)}</td>
<td>
<button class="btn-remover">Remover</button>
</td>
`;

tabelaBody.appendChild(linha);
    })
}