// Estado inicial do jogo com elementos e valores associados
const jogo = {
    interface: {
        quadrados: document.querySelectorAll(".square"), // Seleciona todos os quadrados
        inimigo: document.querySelector(".enemy"), // Seleciona o elemento inimigo
        tempoRestante: document.querySelector("#time-left"), // Elemento que exibe o tempo restante
        pontuacao: document.querySelector("#score"), // Elemento que exibe a pontuação
    },
    valores: {
        velocidadeDoJogo: 1000, // Velocidade do jogo em milissegundos
        posicaoDoInimigo: 0, // ID do quadrado onde o inimigo aparece
        resultado: 0, // Pontuação do jogador
        tempoAtual: 60, // Tempo total de jogo em segundos
    },
    acoes: {
        idDoTemporizador: setInterval(quadradoAleatorio, 1000), // Intervalo para mudar o quadrado do inimigo
        idDoContadorRegressivo: setInterval(contagemRegressiva, 1000), // Intervalo para contagem regressiva
    },
};

// Função para reduzir o tempo e encerrar o jogo quando chegar a 0
function contagemRegressiva() {
    jogo.valores.tempoAtual--; // Decrementa o tempo
    jogo.interface.tempoRestante.textContent = jogo.valores.tempoAtual; // Atualiza a interface

    if (jogo.valores.tempoAtual <= 0) {
        clearInterval(jogo.acoes.idDoContadorRegressivo); // Para o temporizador de contagem regressiva
        clearInterval(jogo.acoes.idDoTemporizador); // Para o temporizador do jogo
        alert("Game Over! O seu resultado foi: " + jogo.valores.resultado); // Mostra o resultado
    }
}

// Função para reproduzir um som
function reproduzirSom(hit) {
    let audio = new Audio("./src/audios/hit.m4a"); // Cria um novo objeto de áudio
    audio.volume = 0.2; // Define o volume
    audio.play(); // Reproduz o som
}

// Função para selecionar um quadrado aleatório onde o inimigo aparece
function quadradoAleatorio() {
    jogo.interface.quadrados.forEach((quadrado) => {
        quadrado.classList.remove("enemy"); // Remove a classe inimigo de todos os quadrados
    });

    let numeroAleatorio = Math.floor(Math.random() * 9); // Gera um número aleatório entre 0 e 8
    let quadradoAleatorio = jogo.interface.quadrados[numeroAleatorio]; // Seleciona um quadrado aleatório
    quadradoAleatorio.classList.add("enemy"); // Adiciona a classe inimigo ao quadrado
    jogo.valores.posicaoDoInimigo = quadradoAleatorio.id; // Atualiza a posição do inimigo
}

// Função para adicionar eventos de clique nos quadrados
function adicionarEventosDeClique() {
    jogo.interface.quadrados.forEach((quadrado) => {
        quadrado.addEventListener("mousedown", () => {
            if (quadrado.id === jogo.valores.posicaoDoInimigo) {
                jogo.valores.resultado++; // Incrementa a pontuação
                jogo.interface.pontuacao.textContent = jogo.valores.resultado; // Atualiza a pontuação na interface
                jogo.valores.posicaoDoInimigo = null; // Reseta a posição do inimigo
                reproduzirSom("hit"); // Reproduz o som de acerto
            }
        });
    });
}

// Função para inicializar o jogo
function inicializar() {
    adicionarEventosDeClique(); // Adiciona os eventos de clique
}

inicializar(); // Inicia o jogo
