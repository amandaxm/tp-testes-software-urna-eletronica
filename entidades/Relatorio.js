class Relatorio {
    constructor(administrador, idVotacao, tituloEleitor) {
        this.administrador = administrador;
        this.idVotacao = idVotacao;
        this.tituloEleitor = tituloEleitor;
    }

    validar() {
        const erros = [];
        if (!identificadorAdministrador) {
            erros.push('Número do administrador não pode ser nulo o vazio');
        }
        if (typeof identificadorAdministrador !== 'string') {
            erros.push('Número do administrador deve ser uma string')
        }
        if (identificadorAdministrador.trim() === '' || isNaN(Number(identificadorAdministrador))) {
            erros.push('Número do administrador inválido, deve representar um número');
        }
        if (identificadorAdministrador.length !== 6) {
            erros.push('Número do administrador inválido, deve ter 6 dígitos');
        }
        const idRegex = /^\d{14}$/; 
        if (!idRegex.test(this.idVotacao)) {
            erros.push('ID da votação inválido. O formato deve ser um número de 14 dígitos.');
        }
        erros.push(this.validateTituloEleitor(this.tituloEleitor));


    }

    validateTituloEleitor(te) {
        const errosTituloEleitor = [];
        
        te = te.replace(/\D/g, '').padStart(12, '0');

        const uf = parseInt(te.substr(8, 2));

        if (te.length !== 12 || uf < 1 || uf > 28) {
            errosTituloEleitor.push("Número de título de eleitor inválido: o formato deve ser composto por 12 dígitos numéricos.");
        }

        let d = 0;
        // Calcula o primeiro dígito verificador
        for (let i = 0; i < 8; i++) {
            d += parseInt(te[i]) * (9 - i);
        }
        d %= 11;
        if (d < 2) {
            if (uf < 3) {
                d = 1 - d;
            } else {
                d = 0;
            }
        } else {
            d = 11 - d;
        }
        // Verifica o primeiro dígito verificador
        if (parseInt(te[10]) !== d) {
            errosTituloEleitor.push("Número de título de eleitor inválido: o primeiro dígito verificador está incorreto.");
        }

        d *= 2;
        // Calcula o segundo dígito verificador
        for (let i = 8; i < 10; i++) {
            d += parseInt(te[i]) * (12 - i);
        }
        d %= 11;
        if (d < 2) {
            if (uf < 3) {
                d = 1 - d;
            } else {
                d = 0;
            }
        } else {
            d = 11 - d;
        }
        // Verifica o segundo dígito verificador
        if (parseInt(te[11]) !== d) {
            errosTituloEleitor.push("Número de título de eleitor inválido: o segundo dígito verificador está incorreto." );
        }

        return errosTituloEleitor;
    }
}
export { Relatorio };
