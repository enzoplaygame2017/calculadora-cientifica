let visor = document.getElementById("visor");
let modo;
ajustarVisor()

function digitar(tecla) {
  visor.value = visor.value + String(tecla);
  ajustarVisor();
}

function apagar() {
  let numeros = visor.value.match(/sin|[0-9.]+|[+\-*/()]|\*\*/g) || [];

  if (numeros.at(-1) === "" && numeros.at(-2) === "**") {
    numeros.splice(-2, 1);
    visor.value = numeros.join("");
  } else {
    numeros[numeros.length - 1] = numeros.at(-1).slice(0, -1);
    visor.value = numeros.join("");
  }
  ajustarVisor();
}

function resolverParenteses(numeros) {
  while (numeros.includes("(")) {
    let inicio = numeros.lastIndexOf("(");
    let fim = numeros.indexOf(")", inicio);

    if (fim === -1) {
      throw new Error(
        "Parênteses inválidos. Tente verificar se os parênteses estão fechados.",
      );
    } else if (numeros[inicio - 1] === "sin") {
      resolverSin(numeros);
      continue;
    }

    let conteudo = numeros.slice(inicio + 1, fim);
    let resultado = calcularExpressao(conteudo);

    numeros.splice(inicio, fim - inicio + 1, String(resultado));
  }

  return numeros;
}


function resolverSin(numeros) {
  let resultado;

  while (numeros.includes("sin")) {
    let sin = numeros.indexOf("sin");
    let inicio = numeros.indexOf("(", sin);
    let fim = numeros.indexOf(")", inicio);

    if (inicio === -1 || fim === -1) {
      throw new Error("Parênteses inválidos.");
    }

    let conteudo = numeros.slice(inicio + 1, fim);
    let valor = Number(conteudo.join(""));

    if (modo === "graus") {
      valor = (valor * Math.PI) / 180;
    }

    resultado = Number(Math.sin(valor).toFixed(2));

    numeros.splice(sin, fim - sin + 1, String(resultado));
  }

  return numeros;
}

function resolverPotencias(numeros) {
  for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] === "**") {
      numeros.splice(
        i - 1,
        3,
        String(Number(numeros[i - 1]) ** Number(numeros[i + 1])),
      );
      i--;
    }
  }

  return numeros;
}

function resolverMultiplicacaoDivisao(numeros) {
  for (let i = 0; i < numeros.length; i++) {
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

  return numeros;
}

function resolverSomaSubtracao(numeros) {
  let resultado = Number(numeros[0]);

  for (let i = 1; i < numeros.length; i += 2) {
    if (numeros[i] === "+") {
      resultado += Number(numeros[i + 1]);
    } else if (numeros[i] === "-") {
      resultado -= Number(numeros[i + 1]);
    }
  }

  return resultado;
}

function calcularExpressao(numeros) {
  resolverParenteses(numeros);
  resolverSin(numeros);
  resolverPotencias(numeros);
  resolverMultiplicacaoDivisao(numeros);
  return resolverSomaSubtracao(numeros);
}

function calcular() {
  try {
    let expressao = visor.value.replaceAll("x", "*");

    let numeros = expressao
      .match(/sin|[0-9.]+|[+\-*/()]/g)
      .filter((numero) => numero !== "");

    let resultado = calcularExpressao(numeros);

    if (!Number.isFinite(resultado)) {
      visor.value = "Erro: Infinito";
    } else if (Number.isNaN(resultado)) {
      visor.value = "Erro: NaN";
    } else {
      visor.value = resultado;
    }
  } catch {
    visor.value = "Erro: Expressão inválida";
  }
  ajustarVisor();
}

function raizQuadrada() {
  visor.value = Math.sqrt(Number(visor.value));
  ajustarVisor();
}

function ajustarVisor() {
  const tamanho = visor.value.length;

  if (tamanho <= 10) {
    visor.style.fontSize = "30px";
  } else if (tamanho <= 15) {
    visor.style.fontSize = "24px";
  } else if (tamanho <= 20) {
    visor.style.fontSize = "18px";
  } else {
    visor.style.fontSize = "14px";
  }
}
