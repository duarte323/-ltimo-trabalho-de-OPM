let imagens = [];
let paginaAtual = 0;
let inputCodigo;
let botaoConfirmar;
let mensagemErro = "";

// --- COORDENADAS DAS ZONAS DE CLIQUE ---
// Formato: { x: posição horizontal, y: posição vertical, w: largura, h: altura }
// Vais precisar de ajustar estes valores para baterem certo com os teus desenhos!
let armarioPagina2 = { x: 300, y: 200, w: 200, h: 300 }; // Para a página 2 (índice 1)
let armarioPagina5 = { x: 400, y: 150, w: 250, h: 350 }; // Para a página 5 (índice 4)
let bauPagina9     = { x: 350, y: 450, w: 300, h: 200 }; // Para a página 9 (índice 8)

function preload() {
  // Carregar as imagens pela ordem da história
  imagens[0] = loadImage('2.png');  // Índice 0
  imagens[1] = loadImage('3.png');  // Índice 1 (Armário)
  imagens[2] = loadImage('4.png');  // Índice 2
  imagens[3] = loadImage('5.png');  // Índice 3
  imagens[4] = loadImage('6.png');  // Índice 4 (Armário)
  imagens[5] = loadImage('7.png');  // Índice 5 (Página do código)
  imagens[6] = loadImage('8.png');  // Índice 6
  imagens[7] = loadImage('9.png');  // Índice 7
  imagens[8] = loadImage('10.png'); // Índice 8 (Baú)
  imagens[9] = loadImage('11.png'); // Índice 9
}

function setup() {
  createCanvas(1000, 680); 

  // Configuração da caixa de texto do código
  inputCodigo = createInput('');
  inputCodigo.position(580, 280); 
  inputCodigo.size(150, 30);
  inputCodigo.style('font-size', '24px');
  inputCodigo.style('text-align', 'center');
  inputCodigo.hide();

  // Configuração do botão de confirmar
  botaoConfirmar = createButton('Confirmar');
  botaoConfirmar.position(750, 280); 
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

  // Lógica da interface para a página do código (Índice 5)
  if (paginaAtual === 5) {
    inputCodigo.show();
    botaoConfirmar.show();
  } else {
    // Esconder elementos de interface nas outras páginas
    inputCodigo.hide();
    botaoConfirmar.hide();
  }

  // Mostrar mensagem de erro/aviso em qualquer página
  if (mensagemErro !== "") {
    fill(255, 0, 0); // Texto a vermelho
    textSize(20);
    textStyle(BOLD);
    textAlign(CENTER);
    text(mensagemErro, width / 2, height - 30); // Aviso na parte inferior do ecrã
    textAlign(LEFT); // Repor alinhamento padrão
  }

  // --- MODO DE AFINAÇÃO (DEBUG) ---
  // Descomenta o bloco abaixo (tira os /* e */) para veres os retângulos vermelhos.
  // Assim podes alterar os valores no topo do código até os retângulos cobrirem o armário/baú.
  
  /*
  noFill();
  stroke(255, 0, 0);
  strokeWeight(3);
  if (paginaAtual === 1) rect(armarioPagina2.x, armarioPagina2.y, armarioPagina2.w, armarioPagina2.h);
  if (paginaAtual === 4) rect(armarioPagina5.x, armarioPagina5.y, armarioPagina5.w, armarioPagina5.h);
  if (paginaAtual === 8) rect(bauPagina9.x, bauPagina9.y, bauPagina9.w, bauPagina9.h);
  */
}

// Lógica de cliques no ecrã (Canvas)
function mousePressed() {
  // Lógica para a Página 2 (Índice 1) - Clicar no armário
  if (paginaAtual === 1) {
    if (mouseX >= armarioPagina2.x && mouseX <= armarioPagina2.x + armarioPagina2.w &&
        mouseY >= armarioPagina2.y && mouseY <= armarioPagina2.y + armarioPagina2.h) {
      paginaAtual++;
      mensagemErro = "";
    }
  } 
  // Lógica para a Página 5 (Índice 4) - Clicar no armário
  else if (paginaAtual === 4) {
    if (mouseX >= armarioPagina5.x && mouseX <= armarioPagina5.x + armarioPagina5.w &&
        mouseY >= armarioPagina5.y && mouseY <= armarioPagina5.y + armarioPagina5.h) {
      paginaAtual++;
      mensagemErro = "";
    }
  } 
  // Lógica para a Página 9 (Índice 8) - Clicar no baú
  else if (paginaAtual === 8) {
    if (mouseX >= bauPagina9.x && mouseX <= bauPagina9.x + bauPagina9.w &&
        mouseY >= bauPagina9.y && mouseY <= bauPagina9.y + bauPagina9.h) {
      paginaAtual++;
      mensagemErro = "";
    }
  }
}

// Navegação usando as setas do teclado
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    // Páginas onde a seta direita fica bloqueada (1, 4, 5 e 8)
    if (paginaAtual === 1 || paginaAtual === 4 || paginaAtual === 8) {
      mensagemErro = "Procura pela sala onde deves clicar para avançar!";
    } else if (paginaAtual === 5) {
      mensagemErro = "Tens de inserir o código correto para avançar!";
    } else if (paginaAtual < imagens.length - 1) {
      paginaAtual++;
      mensagemErro = ""; // Limpa os avisos
    }
  } else if (keyCode === LEFT_ARROW) {
    // Recuar permite sempre, independentemente da página
    if (paginaAtual > 0) {
      paginaAtual--;
      mensagemErro = ""; // Limpa os avisos
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