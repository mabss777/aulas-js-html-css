const botoesAdd = document.querySelectorAll('.add-carrinho');
const carrinhoItens = document.getElementById('carrinho-itens');
const carrinhoCount = document.getElementById('carrinho-count');
const carrinhoTotal = document.getElementById('carrinho-total');

let carrinho = [];
let total = 0;

botoesAdd.forEach(btn => {
    btn.addEventListener('click', () => {
        const produto = btn.parentElement;
        const nome = produto.querySelector('h2').innerText;
        const preco = parseFloat(produto.dataset.preco);

        // Verifica se o item já está no carrinho
        const existente = carrinho.find(item => item.nome === nome);
        if (existente) {
            existente.quantidade += 1;
        } else {
            carrinho.push({ nome, preco, quantidade: 1 });
        }

        total += preco;
        atualizarCarrinho();
        // Feedback visual
        btn.textContent = "Adicionado!";
        setTimeout(() => btn.textContent = "Adicionar", 800);
    });
});

function atualizarCarrinho() {
    carrinhoItens.innerHTML = '';
    carrinho.forEach((item, i) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.nome} x${item.quantidade} - R$ ${(item.preco*item.quantidade).toFixed(2)} 
                        <button class="remove-item" data-index="${i}">X</button>`;
        carrinhoItens.appendChild(li);
    });
    carrinhoCount.textContent = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    carrinhoTotal.textContent = total.toFixed(2);

    // Adiciona evento de remover
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            total -= carrinho[index].preco * carrinho[index].quantidade;
            carrinho.splice(index, 1);
            atualizarCarrinho();
        });
    });
}
