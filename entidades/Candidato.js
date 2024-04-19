class Candidato {
    constructor(nome, partido, numero, urlImagem, dataNascimento) {
    
      this.validarNome(nome);
      this.validarPartido(partido);
      this.validarNumero(numero);
      this.validarUrlImagem(urlImagem);
      this.validarDataNascimento(dataNascimento);
  
      this.nome = nome;
      this.partido = partido;
      this.numero = numero;
      this.urlImagem = urlImagem;
      this.dataNascimento = dataNascimento;
    }
  
    validarNome(nome) {
      if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        throw new Error('Nome inválido');
      }
      if (nome.length > 250) {
        throw new Error('Nome deve ter no máximo 250 caracteres');
      }
    }
  
    validarPartido(partido) {
      if (!partido || typeof partido !== 'string' || partido.trim() === '') {
        throw new Error('Partido inválido');
      }
    }
  
    validarNumero(numero) {
      if (!numero || typeof numero !== 'string' || numero.trim() === '' || isNaN(numero)) {
        throw new Error('Número inválido');
      }
    }
  
    validarUrlImagem(urlImagem) {
      if (!urlImagem || typeof urlImagem !== 'string' || urlImagem.trim() === '') {
        throw new Error('URL de imagem inválida');
      }
    }
  
    validarDataNascimento(dataNascimento) {
      if (!dataNascimento || !(dataNascimento instanceof Date) || isNaN(dataNascimento.getTime())) {
        throw new Error('Data de nascimento inválida');
      }
    }
  }
  export { Candidato };
