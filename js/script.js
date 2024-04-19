let titulo = document.getElementById('titulo');
let nomeCargo = document.getElementById('cargo');

let cargo = document.querySelector('.display-1-2');
let numerosCaixa = document.querySelector('.display-1-3');
let descricao = document.querySelector('.display-1-4');

let aviso = document.querySelector('.display-2');
let lateral = document.querySelector('.display-1-right');

let senhaAdm = false;

let etapaAtual = 0;
let numeroDigitado = '';
let votoBranco = false;
let votoNulo = false;
let votos = [];

function comecarVotacao() {
    console.log(etapas);
    let etapa =  etapas.object[etapaAtual];
    let senhaHTML = '';
    numeroDigitado = '';
    votoBranco = false;
    votoNulo = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            senhaHTML += '<div class="numero pisca"></div>';
        } else {
            senhaHTML += '<div class="numero"></div>';
        }
    }
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numerosCaixa.innerHTML = senhaHTML;
}

function votaCandidato() {
    let etapa =  etapas.object[etapaAtual];
    let numeroHTML = '';
    numeroDigitado = '';
    votoBranco = false;
    votoNulo = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHTML += '<div class="numero pisca"></div>';
        } else {
            numeroHTML += '<div class="numero"></div>';
        }
    }

    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numerosCaixa.innerHTML = numeroHTML;
}

function atualizaInterface() {
    let etapa =  etapas.object[etapaAtual];

    if (etapaAtual == 0) {
        let senhaADM = etapa.administradores.filter((item) => {
            console.log(item);
            if (item.senha === numeroDigitado) {
                return true;
            } else {
                return false;
            }
        });

        if (senhaADM.length > 0) {
            senhaADM = senhaADM[0];
            titulo.textContent = 'ADMINISTRADOR:';
            cargo.innerHTML = '';
            aviso.style.display = 'block';
            descricao.innerHTML = '';
            descricao.innerHTML = '<div class="aviso--grande">ACESSO LIBERADO</div>';
            senhaAdm = true;
        } else {
            titulo.textContent = 'ADMINISTRADOR:';
            aviso.style.display = 'block';
            descricao.innerHTML = '<div class="aviso--grande">ACESSO NEGADO</div>';
            senhaAdm = false;
        }
    } else {
        let candidato = etapa.candidatos.filter((item) => {
            if (item.numero === numeroDigitado) {
                console.log(item);
                return true;
            } else {
                return false;
            }
        });
        console.log(candidato);
        if (candidato.length > 0) {
            candidato = candidato[0];
            titulo.textContent = 'SEU VOTO PARA';
            aviso.style.display = 'block';
            descricao.innerHTML = 'Nome: ' + candidato.nome + '<br/>' + 'Partido: ' + candidato.partido;

            let fotosHTML = '';
            console.log(candidato.urlImagem)
            if (candidato.urlImagem) {
                    fotosHTML += '<div class="display-1-image"> <img src="' +
                    candidato.urlImagem + '" alt="" />' + etapa.titulo + '</div>';
            } 
            if (candidato.vicePresidente) {
                fotosHTML += '<div class="display-1-image"> <img src="' +
                candidato.vicePresidente.urlImagem + '" alt="" />' + candidato.vicePresidente.cargo + '</div>';
        } 
                
            lateral.innerHTML = fotosHTML;
        } else {
            titulo.textContent = 'SEU VOTO PARA';
            aviso.style.display = 'block';
            descricao.innerHTML = '<div class="aviso--grande">VOTO NULO</div>';
            votoNulo = true;
        }
    }
}

function clicou(num) {
    let ehNumero = document.querySelector('.numero.pisca');

    if (ehNumero !== null) {
        ehNumero.innerHTML = num;
        numeroDigitado = numeroDigitado + num;

        ehNumero.classList.remove('pisca');

        if (ehNumero.nextElementSibling !== null) {
            ehNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}

function branco() {
    numeroDigitado === '';
    votoBranco = true;
    titulo.textContent = 'SEU VOTO PARA';
    aviso.style.display = 'block';
    numerosCaixa.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';
}

function corrige() {
    votaCandidato();
}

function confirma() {
    let etapa =  etapas.object[etapaAtual];
    let votoConfirmado = false;

    if (votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas.object[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numeroDigitado.length === etapa.numeros) {
        votoConfirmado = true;

        if (votoNulo === true) {
            votos.push({
                etapa: etapas.object[etapaAtual].titulo,
                voto: 'nulo'
            });
        } else {
            votos.push({
                etapa: etapas.object[etapaAtual].titulo,
                voto: numeroDigitado
            });
        }
    }
    if (votoConfirmado) {
        etapaAtual++;
        if (etapas.object[etapaAtual] !== undefined) {
            votaCandidato();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--muito-grande">FIM</div>';
            console.log(votos);
        }
    }
}

comecarVotacao();
