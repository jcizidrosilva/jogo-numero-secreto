let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.textContent = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}

function exibirMensagemInicial() {
  exibirTextoNaTela("h1", `Jogo do numero secreto`);
  exibirTextoNaTela("p", `Escolha um numero entre 1 e 10`);
}

exibirMensagemInicial();

function verificarChute() {
  let chute = document.querySelector("input").value;

  if (chute == numeroSecreto) {
    exibirTextoNaTela("h1", `Acertou`);

    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `Voce descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela("p", mensagemTentativas);

    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", `O numero secreto é menor`);
    } else {
      exibirTextoNaTela("p", `O numero secreto é maior`);
    }

    tentativas++;
    limparCampo();
  }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = Math.trunc(Math.random() * numeroLimite + 1);
  let quantidadeElementosLista = listaNumerosSorteados.length;

  if (quantidadeElementosLista == numeroLimite) {
    listaNumerosSorteados = [];
  }

  if (listaNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaNumerosSorteados.push(numeroEscolhido);
    console.log(listaNumerosSorteados);
    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
