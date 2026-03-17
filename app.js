let imagens = [];
let paginaAtual = 0;
let inputCodigo;
let botaoConfirmar;
let mensagemErro = "";

//COORDENADAS DAS ZONAS DE CLIQUE


let armarioPagina2 = { x: 100, y: 200, w: 200, h: 300 };
let armarioPagina5 = { x: 650, y: 150, w: 250, h: 350 };
let bauPagina9     = { x: 350, y: 350, w: 300, h: 200 }; 

function preload() {
  imagens[0] = loadImage('1.png');
  imagens[1] = loadImage('Adicionar um subtítulo (1).png');
  imagens[2] = loadImage('3.png');
  imagens[3] = loadImage('4.png');
  imagens[4] = loadImage('5.png');
  imagens[5] = loadImage('6.png');
  imagens[6] = loadImage('7.png');
  imagens[7] = loadImage('8.png');
  imagens[8] = loadImage('9.png');  
  imagens[9] = loadImage('10.png'); 
  imagens[10] = loadImage('11.png');
  imagens[11] = loadImage('12.png');
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

  // página atual
  if (imagens[paginaAtual]) {
    image(imagens[paginaAtual], 0, 0, width, height);
  }


  if (paginaAtual === 6) {
    inputCodigo.show();
    botaoConfirmar.show();
  } else {
   
    inputCodigo.hide();
    botaoConfirmar.hide();
  }

  // Mensagem de erro/aviso em qualquer página
  if (mensagemErro !== "") {
    fill(255, 0, 0);
    textSize(20);
    textStyle(BOLD);
    textAlign(CENTER);
    text(mensagemErro, width / 2, height - 30);
    textAlign(LEFT);
  }
}


function mousePressed() {

  if (paginaAtual === 2) {
    if (mouseX >= armarioPagina2.x && mouseX <= armarioPagina2.x + armarioPagina2.w &&
        mouseY >= armarioPagina2.y && mouseY <= armarioPagina2.y + armarioPagina2.h) {
      paginaAtual++;
      mensagemErro = "";
    }
  } 

  else if (paginaAtual === 5) {
    if (mouseX >= armarioPagina5.x && mouseX <= armarioPagina5.x + armarioPagina5.w &&
        mouseY >= armarioPagina5.y && mouseY <= armarioPagina5.y + armarioPagina5.h) {
      paginaAtual++;
      mensagemErro = "";
    }
  } 
 
  else if (paginaAtual === 9) {
    if (mouseX >= bauPagina9.x && mouseX <= bauPagina9.x + bauPagina9.w &&
        mouseY >= bauPagina9.y && mouseY <= bauPagina9.y + bauPagina9.h) {
      paginaAtual++;
      mensagemErro = "";
    }
  }
}

// setas do teclado
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    // seta direita fica bloqueada (2, 5, 6 e 9)
    if (paginaAtual === 2 || paginaAtual === 5 || paginaAtual === 9) {
      mensagemErro = "Procura pela sala onde deves clicar para avançar!";
    } else if (paginaAtual === 6) {
      mensagemErro = "Tens de inserir o código correto para avançar!";
    } else if (paginaAtual < imagens.length - 1) {
      paginaAtual++;
      mensagemErro = "";
    }
  } else if (keyCode === LEFT_ARROW) {
    
    if (paginaAtual > 0) {
      paginaAtual--;
      mensagemErro = "";
    }
  }
}

function verificarCodigo() {
  if (inputCodigo.value() === "46721") {
    paginaAtual++; 
    inputCodigo.value(''); 
    mensagemErro = "";
  } else {
    mensagemErro = "Código incorreto! Tenta outra vez";
    inputCodigo.value(''); 
  }
}