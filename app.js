let imagens = [];
let paginaAtual = 0;
let inputCodigo;
let botaoConfirmar;
let mensagemErro = "";

function preload() {
  // Carregar as imagens pela ordem da história
  imagens[0] = loadImage('2.png');
  imagens[1] = loadImage('3.png');
  imagens[2] = loadImage('4.png');
  imagens[3] = loadImage('5.png');
  imagens[4] = loadImage('6.png');
  imagens[5] = loadImage('7.png'); // A página do código (Página 6)
  imagens[6] = loadImage('8.png');
  imagens[7] = loadImage('9.png');
  imagens[8] = loadImage('10.png');
  imagens[9] = loadImage('11.png');
}

function setup() {
  createCanvas(1000, 680); 

  // Configuração da caixa de texto do código
  inputCodigo = createInput('');
  inputCodigo.position(580, 280); // Ajusta a posição se necessário
  inputCodigo.size(150, 30);
  inputCodigo.style('font-size', '24px');
  inputCodigo.style('text-align', 'center');
  inputCodigo.hide();

  // Configuração do botão de confirmar
  botaoConfirmar = createButton('Confirmar');
  botaoConfirmar.position(750, 280); // Ajusta a posição se necessário
  botaoConfirmar.size(100, 36);
  botaoConfirmar.style('font-size', '18px');
  botaoConfirmar.style('cursor', 'pointer');
  botaoConfirmar.mousePressed(verificarCodigo);
  botaoConfirmar.hide();
}

function draw() {
  background(220);

  // Desenha a página atual
  if (imagens[paginaAtual]) {
    image(imagens[paginaAtual], 0, 0, width, height);
  }

  // Lógica para a página do código (Índice 5)
  if (paginaAtual === 5) {
    inputCodigo.show();
    botaoConfirmar.show();
    
    // Mostrar mensagem de erro ou aviso
    if (mensagemErro !== "") {
      fill(255, 0, 0);
      textSize(20);
      textStyle(BOLD);
      text(mensagemErro, 580, 340);
    }
  } else {
    // Esconder elementos de interface nas outras páginas
    inputCodigo.hide();
    botaoConfirmar.hide();
  }
}

// Navegação usando as setas do teclado
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    // Tentar avançar
    if (paginaAtual === 5) {
      // Bloqueia o avanço e mostra aviso se estiver na página do código
      mensagemErro = "Tens de inserir o código correto para avançar!";
    } else if (paginaAtual < imagens.length - 1) {
      paginaAtual++;
      mensagemErro = ""; // Limpa os avisos ao mudar de página
    }
  } else if (keyCode === LEFT_ARROW) {
    // Recuar
    if (paginaAtual > 0) {
      paginaAtual--;
      mensagemErro = ""; // Limpa os avisos ao mudar de página
    }
  }
}

function verificarCodigo() {
  if (inputCodigo.value() === "46721") {
    paginaAtual++; // Avança a página com sucesso
    inputCodigo.value(''); // Limpa a caixa
    mensagemErro = "";
  } else {
    mensagemErro = "Código incorreto! Tenta de novo.";
    inputCodigo.value(''); // Limpa a caixa para tentar outra vez
  }
}