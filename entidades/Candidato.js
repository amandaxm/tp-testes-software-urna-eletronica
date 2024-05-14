class Candidato {
  constructor(nome, partido, numero, urlImagem, dataNascimento) {
    this.nome = nome;
    this.partido = partido;
    this.numero = numero;
    this.urlImagem = urlImagem;
    this.dataNascimento = dataNascimento;
  }



  validar() {
    const errors = [];


    if (!this.nome || typeof this.nome !== 'string' || this.nome.trim() === '') {
      errors.push('Nome inválido');
    }
    if (!this.nome.trim().includes(' ')) {
      errors.push('Nome inválido. Deve conter pelo menos um sobrenome.');
    }
    if (this.nome.length > 250) {
      errors.push('Nome deve ter no máximo 250 caracteres');
    }
    if (!this.partido || typeof this.partido !== 'string' || this.partido.trim() === '') {
      errors.push('Partido inválido');
    }
    if (!this.numero || typeof this.numero !== 'string' || this.numero.trim() === '' || isNaN(this.numero)) {
      errors.push('Número inválido');
    }
    if (!this.urlImagem || typeof this.urlImagem !== 'string' || this.urlImagem.trim() === '') {
      errors.push('URL de imagem inválida');
    }
    const data = new Date(this.dataNascimento);
    if (isNaN(data.getTime())) {
      errors.push('Data de nascimento inválida');
    }

    return errors;
  }
}

export { Candidato };
