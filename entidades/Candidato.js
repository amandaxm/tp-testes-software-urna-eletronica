class Candidato {
  constructor(nome, partido, numero, urlImagem, dataNascimento) {
    this.nome = nome;
    this.partido = partido;
    this.numero = numero;
    this.urlImagem = urlImagem;
    this.dataNascimento = dataNascimento;
  }

  validarNome() {
    const errors = [];

    if (!this.nome) {
      errors.push('O nome do candidato é obrigatório.');
    } else if (typeof this.nome !== 'string') {
      errors.push('O nome do candidato deve ser uma string.');
    } else if (this.nome.trim() === '') {
      errors.push('O nome do candidato não pode ser uma string vazia.');
    } else if (this.nome.length > 250) {
      errors.push('O nome do candidato deve ter no máximo 250 caracteres.');
    } else {
      const partesNome = this.nome.trim().split(' ');
      if (partesNome.length < 2) {
        errors.push('O nome do candidato deve conter pelo menos um sobrenome.');
      }
    }

    return errors;
  }

  validarPartido() {
    const errors = [];

    if (!this.partido) {
      errors.push('Partido não pode ser vazio');
    } else if (typeof this.partido !== 'string') {
      errors.push('Partido deve ser uma string');
    } else if (this.partido.trim() === '') {
      errors.push("O partido deve ser uma string não vazia e não pode conter apenas espaços em branco.");
    }

    return errors;
  }

  validarNumero() {
    const errors = [];

    if (!this.numero) {
      errors.push('O número do candidato é obrigatório.');
    } else if (typeof this.numero !== 'string') {
      errors.push('O número do candidato deve ser uma string.');
    } else if (this.numero.trim() === '') {
      errors.push('O número do candidato não pode ser uma string vazia.');
    } else if (isNaN(this.numero)) {
      errors.push('O número do candidato deve ser um valor numérico.');
    }

    return errors;
  }

  validarURLImagem() {
    const errors = [];

    if (!this.urlImagem) {
      errors.push('A URL da imagem do candidato é obrigatória.');
    } else if (typeof this.urlImagem !== 'string') {
      errors.push('A URL da imagem do candidato deve ser uma string.');
    } else if (this.urlImagem.trim() === '') {
      errors.push('A URL da imagem do candidato não pode ser uma string vazia.');
    }

    return errors;
  }

  validarDataNascimento() {
    const errors = [];

    if (!this.dataNascimento) {
      errors.push('Data de nascimento é obrigatória');
    }
    const data = new Date(this.dataNascimento);
    if (isNaN(data.getTime())) {
      errors.push('Data de nascimento inválida');
    }

    return errors;
  }

  validar() {
    const errors = [
      ...this.validarNome(),
      ...this.validarPartido(),
      ...this.validarNumero(),
      ...this.validarURLImagem(),
      ...this.validarDataNascimento()
    ];
    return errors;
  }
}

module.exports = { Candidato };
