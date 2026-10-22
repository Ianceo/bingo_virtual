const TOTAL_DE_NUMEROS = 75;

let numerosSorteados = [];

const bola = document.getElementById('bola');
const mensagem = document.getElementById('mensagem');
const botaoSortear = document.getElementById('botao-sortear');
const botaoReiniciar = document.getElementById('botao-reiniciar');
const contador = document.getElementById('contador');
const barraProgresso = document.getElementById('barra-progresso');
const ultimosNumeros = document.getElementById('ultimos-numeros');
const cartela = document.getElementById('cartela');

function gerarNumeroAleatorio() {

  return Math.floor(Math.random() * TOTAL_DE_NUMEROS) + 1;
}

function descobrirLetra(numero) {
  if (numero <= 15) {
    return 'B';
  } else if (numero <= 30) {
    return 'I';
  } else if (numero <= 45) {
    return 'N';
  } else if (numero <= 60) {
    return 'G';
  } else {
    return 'O';
  }
}

function criarCartela() {
  cartela.innerHTML = '';

  for (let numero = 1; numero <= TOTAL_DE_NUMEROS; numero++) {
    const casa = document.createElement('span');
    casa.textContent = numero;
    casa.id = 'casa-' + numero;
    casa.className = 'casa casa-' + descobrirLetra(numero);
    cartela.appendChild(casa);
  }
}

function sortearNumero() {

  if (numerosSorteados.length === TOTAL_DE_NUMEROS) {
    return;
  }

  let numero = gerarNumeroAleatorio();

  while (numerosSorteados.includes(numero)) {
    numero = gerarNumeroAleatorio();
  }

  numerosSorteados.push(numero);

  mostrarNaBola(numero);
  marcarNaCartela(numero);
  atualizarUltimosNumeros();
  atualizarContador();

  mensagem.textContent = 'Saiu o número ' + descobrirLetra(numero) + '-' + numero + '! Confira sua cartela.';

  if (numerosSorteados.length === TOTAL_DE_NUMEROS) {
    mensagem.textContent = 'Fim de jogo! Todos os 75 números foram sorteados.';
    botaoSortear.disabled = true;
  }
}

function mostrarNaBola(numero) {
  const letra = descobrirLetra(numero);

  bola.className = 'bola bola-' + letra;

  bola.innerHTML =
    '<span class="bola-letra">' + letra + '</span>' +
    '<span class="bola-numero">' + numero + '</span>';
}

function marcarNaCartela(numero) {
  const casaAnterior = document.querySelector('.casa.ultimo');
  if (casaAnterior) {
    casaAnterior.classList.remove('ultimo');
  }
  const casa = document.getElementById('casa-' + numero);
  casa.classList.add('sorteado', 'ultimo');
}

function atualizarUltimosNumeros() {
  ultimosNumeros.innerHTML = '';

  const ultimos = numerosSorteados.slice(-5).reverse();
  for (const numero of ultimos) {
    const bolinha = document.createElement('span');
    bolinha.textContent = numero;
    bolinha.className = 'bolinha bola-' + descobrirLetra(numero);
    ultimosNumeros.appendChild(bolinha);
  }
}

function atualizarContador() {
  const quantidade = numerosSorteados.length;

  contador.textContent = quantidade + ' de ' + TOTAL_DE_NUMEROS + ' números sorteados';

  barraProgresso.style.width = (quantidade / TOTAL_DE_NUMEROS) * 100 + '%';
}

function reiniciarJogo() {
  numerosSorteados = []; 

  bola.className = 'bola';
  bola.innerHTML = '<span class="bola-numero">?</span>';

  criarCartela();
  atualizarUltimosNumeros();
  atualizarContador();

  mensagem.textContent = 'Clique em "Sortear número" para começar!';
  botaoSortear.disabled = false;
}

botaoSortear.addEventListener('click', sortearNumero);
botaoReiniciar.addEventListener('click', reiniciarJogo);

criarCartela();
