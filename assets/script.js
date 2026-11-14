/* ========================================= */
/* QUIZ                                      */
/* ========================================= */

// SÓ RODA O QUIZ SE A PÁGINA TIVER O BOTÃO DE INICIAR
const botaoIniciar = document.getElementById("botaoIniciar");

if (botaoIniciar != null) {

    // LISTA DE PERGUNTAS (CORRETA = NÚMERO DA ALTERNATIVA CERTA, COMEÇANDO EM 0)
    const perguntas = [
        {
            categoria: "Carboidratos",
            pergunta: "Qual é a principal função da glicose nas células?",
            alternativas: [
                "Armazenar informações genéticas",
                "Fornecer energia para processos celulares",
                "Formar anticorpos diretamente",
                "Formar a membrana celular"
            ],
            correta: 1,
            explicacao: "A glicose é usada pelas células para produzir energia."
        },
        {
            categoria: "Carboidratos",
            pergunta: "Qual açúcar está presente no leite?",
            alternativas: [
                "Sacarose",
                "Frutose",
                "Lactose",
                "Amido"
            ],
            correta: 2,
            explicacao: "A lactose é o açúcar do leite."
        },
        {
            categoria: "Lipídios",
            pergunta: "Qual é uma das principais funções dos lipídios?",
            alternativas: [
                "Reserva de energia",
                "Transportar oxigênio no sangue",
                "Armazenar informação genética",
                "Formar o DNA"
            ],
            correta: 0,
            explicacao: "Os lipídios guardam energia e também ajudam no isolamento térmico."
        },
        {
            categoria: "Lipídios",
            pergunta: "Qual característica é comum aos lipídios?",
            alternativas: [
                "São solúveis em água",
                "São formados só por aminoácidos",
                "São formados por nucleotídeos",
                "São insolúveis em água"
            ],
            correta: 3,
            explicacao: "Os lipídios não se misturam com a água."
        },
        {
            categoria: "Proteínas",
            pergunta: "Quais são as unidades que formam as proteínas?",
            alternativas: [
                "Nucleotídeos",
                "Aminoácidos",
                "Monossacarídeos",
                "Ácidos graxos"
            ],
            correta: 1,
            explicacao: "As proteínas são formadas por aminoácidos ligados entre si."
        },
        {
            categoria: "Proteínas",
            pergunta: "Como se chama a ligação que une os aminoácidos?",
            alternativas: [
                "Ligação peptídica",
                "Ligação glicosídica",
                "Ligação éster",
                "Ligação metálica"
            ],
            correta: 0,
            explicacao: "A ligação peptídica une um aminoácido ao outro."
        },
        {
            categoria: "Polímeros",
            pergunta: "O que é um polímero?",
            alternativas: [
                "Molécula formada por um único monômero",
                "Mistura de água e sais minerais",
                "Molécula formada pela união de muitos monômeros",
                "Átomo isolado"
            ],
            correta: 2,
            explicacao: "Polímeros são formados pela repetição de várias unidades chamadas monômeros."
        },
        {
            categoria: "Polímeros",
            pergunta: "Qual é um exemplo de polímero natural?",
            alternativas: [
                "PVC",
                "Náilon",
                "Isopor",
                "Celulose"
            ],
            correta: 3,
            explicacao: "A celulose é produzida pelas plantas, por isso é natural."
        },
        {
            categoria: "Ácidos Nucleicos",
            pergunta: "Quais são os dois tipos de ácidos nucleicos?",
            alternativas: [
                "ATP e ADP",
                "DNA e RNA",
                "Glicose e frutose",
                "Lipídio e proteína"
            ],
            correta: 1,
            explicacao: "Os ácidos nucleicos são o DNA e o RNA."
        },
        {
            categoria: "Ácidos Nucleicos",
            pergunta: "Qual é a unidade que forma os ácidos nucleicos?",
            alternativas: [
                "Aminoácido",
                "Ácido graxo",
                "Nucleotídeo",
                "Monossacarídeo"
            ],
            correta: 2,
            explicacao: "Os ácidos nucleicos são formados por nucleotídeos."
        }
    ];

    // VARIÁVEIS DO QUIZ
    let atual = 0;       // NÚMERO DA PERGUNTA ATUAL
    let pontos = 0;      // QUANTIDADE DE ACERTOS
    let escolhida = -1;  // ALTERNATIVA ESCOLHIDA (-1 = NENHUMA)
    let respondeu = false; // INDICA SE A RESPOSTA JÁ FOI CONFIRMADA

    // ELEMENTOS DA PÁGINA
    const telaInicial = document.getElementById("telaInicial");
    const telaQuiz = document.getElementById("telaQuiz");
    const telaResultado = document.getElementById("telaResultado");
    const botaoProxima = document.getElementById("botaoProxima");
    const botaoReiniciar = document.getElementById("botaoReiniciar");
    const feedback = document.getElementById("feedback");
    const botoes = document.querySelectorAll(".alternativa");

    // FUNÇÃO QUE MOSTRA A PERGUNTA ATUAL
    function mostrarPergunta() {
        const p = perguntas[atual];
        const letras = ["A- ", "B- ", "C- ", "D- "];

        document.getElementById("categoria").textContent = p.categoria;
        document.getElementById("contadorPergunta").textContent = "Pergunta " + (atual + 1) + " de " + perguntas.length;
        document.getElementById("pontuacaoAtual").textContent = "Pontuação: " + pontos;
        document.getElementById("pergunta").textContent = p.pergunta;

        // BARRA DE PROGRESSO
        document.getElementById("progressoPreenchido").style.width = (atual / perguntas.length * 100) + "%";
        document.getElementById("progresso").setAttribute("aria-valuenow", atual);

        // COLOCA O TEXTO E LIMPA AS CORES DAS ALTERNATIVAS
        for (let i = 0; i < botoes.length; i++) {
            botoes[i].textContent = letras[i] + p.alternativas[i];
            botoes[i].classList.remove("selecionada", "certa", "errada");
        }

        // RESETA O ESTADO DA PERGUNTA
        escolhida = -1;
        respondeu = false;
        feedback.hidden = true;
        botaoProxima.disabled = true;
        botaoProxima.textContent = "Confirmar resposta";
    }

    // FUNÇÃO QUE VERIFICA SE A RESPOSTA ESTÁ CERTA OU ERRADA
    function verificarResposta() {
        const p = perguntas[atual];
        respondeu = true;

        // PINTA A ALTERNATIVA CORRETA DE VERDE
        botoes[p.correta].classList.add("certa");

        if (escolhida == p.correta) {
            // ACERTOU
            pontos = pontos + 1;
            feedback.className = "feedback certo";
            document.getElementById("tituloFeedback").textContent = "✅ Resposta certa!";
        } else {
            // ERROU
            botoes[escolhida].classList.add("errada");
            feedback.className = "feedback errado";
            document.getElementById("tituloFeedback").textContent = "❌ Resposta errada!";
        }

        document.getElementById("explicacao").textContent = p.explicacao;
        document.getElementById("pontuacaoAtual").textContent = "Pontuação: " + pontos;
        feedback.hidden = false;

        // MUDA O TEXTO DO BOTÃO
        if (atual == perguntas.length - 1) {
            botaoProxima.textContent = "Ver resultado";
        } else {
            botaoProxima.textContent = "Próxima pergunta";
        }
    }

    // FUNÇÃO QUE MOSTRA A TELA FINAL
    function mostrarResultado() {
        telaQuiz.hidden = true;
        telaResultado.hidden = false;

        const total = perguntas.length;
        const erros = total - pontos;
        const percentual = pontos / total * 100;

        document.getElementById("pontuacaoFinal").textContent = pontos;
        document.getElementById("totalAcertos").textContent = pontos;
        document.getElementById("totalErros").textContent = erros;
        document.getElementById("percentual").textContent = "Você acertou " + percentual + "% das perguntas.";

        // MENSAGEM FINAL DE ACORDO COM A NOTA
        if (pontos >= 8) {
            document.getElementById("mensagemFinal").textContent = "Parabéns! Você domina as macromoléculas!";
        } else if (pontos >= 5) {
            document.getElementById("mensagemFinal").textContent = "Muito bem! Falta pouco!";
        } else {
            document.getElementById("mensagemFinal").textContent = "Continue estudando!";
        }
    }

    // CLIQUE EM UMA ALTERNATIVA
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].addEventListener("click", function () {
            // NÃO DEIXA MUDAR DEPOIS DE CONFIRMAR
            if (respondeu) {
                return;
            }

            // REMOVE A MARCAÇÃO DAS OUTRAS E MARCA A CLICADA
            for (let j = 0; j < botoes.length; j++) {
                botoes[j].classList.remove("selecionada");
            }
            botoes[i].classList.add("selecionada");

            escolhida = i;
            botaoProxima.disabled = false;
        });
    }

    // CLIQUE NO BOTÃO PRINCIPAL (CONFIRMAR / PRÓXIMA / VER RESULTADO)
    botaoProxima.addEventListener("click", function () {
        if (respondeu == false) {
            verificarResposta();
        } else if (atual == perguntas.length - 1) {
            mostrarResultado();
        } else {
            atual = atual + 1;
            mostrarPergunta();
        }
    });

    // CLIQUE EM "COMEÇAR DESAFIO"
    botaoIniciar.addEventListener("click", function () {
        telaInicial.hidden = true;
        telaQuiz.hidden = false;
        mostrarPergunta();
    });

    // CLIQUE EM "JOGAR NOVAMENTE"
    botaoReiniciar.addEventListener("click", function () {
        atual = 0;
        pontos = 0;
        telaResultado.hidden = true;
        telaQuiz.hidden = false;
        mostrarPergunta();
    });
}
