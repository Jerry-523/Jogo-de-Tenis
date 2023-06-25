// Elementos DOM
var jogador1 = document.getElementById('jogador1');
var jogador2 = document.getElementById('jogador2');
var bola = document.getElementById('bola');
var pontosJogador1 = 0;
var pontosJogador2 = 0;
var pontosJogador1Element = document.getElementById('pontos-jogador1');
var pontosJogador2Element = document.getElementById('pontos-jogador2');

// Posição inicial
var posicaoJogador1 = 110;
var posicaoJogador2 = 110;
var posicaoBola = { top: 180, left: 350 };

var velocidadeJogador = 10;
var velocidadeBolaX = 2;
var velocidadeBolaY = 2;


function moverJogador1Cima() {
  if (posicaoJogador1 - velocidadeJogador >= 10) {
    posicaoJogador1 -= velocidadeJogador;
    jogador1.style.top = posicaoJogador1 + 'px';
  }
}


function moverJogador1Baixo() {
  if (posicaoJogador1 + velocidadeJogador + 80 <= 390) {
    posicaoJogador1 += velocidadeJogador;
    jogador1.style.top = posicaoJogador1 + 'px';
  }
}


function moverJogador2Cima() {
  if (posicaoJogador2 - velocidadeJogador >= 10) {
    posicaoJogador2 -= velocidadeJogador;
    jogador2.style.top = posicaoJogador2 + 'px';
  }
}
o
function moverJogador2Baixo() {
  if (posicaoJogador2 + velocidadeJogador + 80 <= 390) {
    posicaoJogador2 += velocidadeJogador;
    jogador2.style.top = posicaoJogador2 + 'px';
  }
}


function verificarColisao() {
  var jogador1Top = posicaoJogador1;
  var jogador1Bottom = posicaoJogador1 + 80;
  var jogador2Top = posicaoJogador2;
  var jogador2Bottom = posicaoJogador2 + 80;

  var bolaTop = posicaoBola.top;
  var bolaBottom = posicaoBola.top + 20;
  var bolaLeft = posicaoBola.left;
  var bolaRight = posicaoBola.left + 20;

  
  if (
    bolaLeft <= 50 &&
    bolaTop <= jogador1Bottom &&
    bolaBottom >= jogador1Top
  ) {
    velocidadeBolaX = Math.abs(velocidadeBolaX); 
  }

  
  if (
    bolaLeft >= 650 &&
    bolaTop <= jogador2Bottom &&
    bolaBottom >= jogador2Top
  ) {
    velocidadeBolaX = -Math.abs(velocidadeBolaX); 
  }
}


function atualizarBola() {
  posicaoBola.top += velocidadeBolaY;
  posicaoBola.left += velocidadeBolaX;

  if (posicaoBola.top <= 10 || posicaoBola.top + 10 >= 400) {
    velocidadeBolaY *= -1; 
  }
  if (posicaoBola.left <= 10 || posicaoBola.left + 10 >= 700) {
    velocidadeBolaX *= -1; 
    if(posicaoBola.left <= 10) {
      pontosJogador1 += 1
      atualizarPlacar();
    }
    if(posicaoBola.left + 10 >= 700) {
      pontosJogador2 += 1
      atualizarPlacar();
    }
  }
  verificarColisao();

  // Atualizar a posição da bola no DOM
  bola.style.top = posicaoBola.top + 'px';
  bola.style.left = posicaoBola.left + 'px';
}


function atualizarPlacar() {
  pontosJogador1Element.textContent = pontosJogador1;
  pontosJogador2Element.textContent = pontosJogador2;
}

function reiniciarJogo() {
  posicaoJogador1 = 110;
  posicaoJogador2 = 110;
  posicaoBola = { top: 180, left: 350 };
  velocidadeBolaX = 2;
  velocidadeBolaY = 2;
  atualizarPlacar();
  jogador1.style.top = posicaoJogador1 + 'px';
  jogador2.style.top = posicaoJogador2 + 'px';
  bola.style.top = posicaoBola.top + 'px';
  bola.style.left = posicaoBola.left + 'px';
}

function jogar() {
  setInterval(function () {
    atualizarBola();
  }, 10);
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'w') {
    moverJogador1Cima();
  } else if (event.key === 's') {
    moverJogador1Baixo();
  } else if (event.key === 'ArrowUp') {
    moverJogador2Cima();
  } else if (event.key === 'ArrowDown') {
    moverJogador2Baixo();
  }
});

reiniciarJogo();
jogar();
