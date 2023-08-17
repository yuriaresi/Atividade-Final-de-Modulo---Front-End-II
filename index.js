let paginaAtual = 1;

function criarPersonagens(personagens) {
    const div = document.querySelector(".personagem");
    div.innerHTML = ""; 
    personagens.forEach(personagem => {
        const html = `<div class="personagens">
            <img src="${personagem.image}" alt="">
            <div class="texto">
                <strong><h1>${personagem.name}</h1></strong>
                <b>Status:</b><span>${personagem.status}</span><br>
               <br>
                <b>Espécie:</b><span>${personagem.species}</span><br>
                <br>
                </div>
        </div>`;
        div.innerHTML += html;
    });
}

function urlAtual(url) {
    axios.get(url)
        .then(function (response) {
            const personagens = response.data.results;
            criarPersonagens(personagens);
            const proximoPagina = response.data.info.next;
            const paginaAnterior = response.data.info.prev;

            const botaoProximo = document.querySelector(".proximaPagina");
            const botaoVoltar = document.querySelector(".voltarPagina");

            botaoProximo.addEventListener("click", function () {
                if (proximoPagina) {
                    urlAtual(proximoPagina);
                    var botaovoltar = document.querySelector(".voltarPagina");
                    botaovoltar.style.display = "block";    
                }
            });

            botaoVoltar.addEventListener("click", function () {
                if (paginaAnterior) {
                    urlAtual(paginaAnterior);
                }
            });

            console.log(response.data)
            const div = document.querySelector(".div-footer");
            div.innerHTML = `<p clas="Ppersonagens">PERSONAGENS: ${response.data.info.count}</p>`;
        })
        .catch(function (error) {
            console.log(error.message);
        });
}

urlAtual("https://rickandmortyapi.com/api/character?page=" + paginaAtual);
