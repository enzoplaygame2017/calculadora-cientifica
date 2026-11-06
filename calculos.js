let visor = document.getElementById("visor");
let modo;

function digitar(tecla) {
  visor.value = visor.value + String(tecla);
}

function apagar() {
  let numeros = visor.value.split(/(\*\*|[+\-*/])/);

  if (numeros.at(-1) === "" && numeros.at(-2) === "**") {
    numeros.splice(-2, 1);
    visor.value = numeros.join("");
  } else {
    numeros[numeros.length - 1] = numeros.at(-1).slice(0, -1);
    visor.value = numeros.join("");
  }
}

async function calcular() {
  let expressao = visor.value.replaceAll("x", "*");
  let resultado;
  let numeros = expressao.split(/(\*\*|[+\-*/()])/);
  let inicioParenteses = numeros.lastIndexOf("(");
  let fimParenteses = numeros.indexOf(")", inicioParenteses);

  for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] === numeros[inicioParenteses]) {
      let conteudo = numeros.slice(inicioParenteses + 1, fimParenteses);
      console.log(conteudo);
      let operacao = conteudo[0];
      for (let i2 = 1; i2 < conteudo.length; i2++) {
        operacao = String(operacao) + String(conteudo[i2]);
      }
      console.log(operacao);
      if (operacao.includes("+")) {
        conteudo = conteudo.replace(String(operacao), String(operacao.slice(0, conteudo.indexOf('+')) + operacao.slice(conteudo.indexOf('+') + 1)));
        console.log(conteudo)
      }
    }
    if (numeros[i] === "**") {
      numeros.splice(
        i - 1,
        3,
        String(Number(numeros[i - 1]) ** Number(numeros[i + 1])),
      );
      i--;
    }
    if (numeros[i] === "*") {
      numeros.splice(
        i - 1,
        3,
        String(Number(numeros[i - 1]) * Number(numeros[i + 1])),
      );
      i--;
    } else if (numeros[i] === "/") {
      numeros.splice(
        i - 1,
        3,
        String(Number(numeros[i - 1]) / Number(numeros[i + 1])),
      );
      i--;
    }
  }

  resultado = Number(numeros[0]);

  for (let i = 1; i < numeros.length; i += 2) {
    if (numeros[i] === "+") {
      resultado += Number(numeros[i + 1]);
    } else if (numeros[i] === "-") {
      resultado -= Number(numeros[i + 1]);
    }
  }

  if (!Number.isFinite(resultado)) {
    visor.value = "Erro: Infinito";
  } else if (Number.isNaN(resultado)) visor.value = "Erro: NaN";
  else {
    visor.value = resultado;
  }
}

function raizQuadrada() {
  visor.value = Math.sqrt(Number(visor.value));
}
