import { Candidato } from './Candidato.js';

class Deputado extends Candidato {
    constructor(nome, partido, numero, urlImagem, dataNascimento) {
      super(nome, partido, numero, urlImagem, dataNascimento);
      this.validarNumeroDeputado(numero);
      this.validarIdadeDeputado(dataNascimento);
    }
  
    validarNumeroDeputado(numero) {
      if (numero.length !== 4) {
        throw new Error('Número do deputado deve ter 4 dígitos');
      }
    }
  
    validarIdadeDeputado(dataNascimento) {
      const idadeMinima = 21; 
      const hoje = new Date();
      const idade = hoje.getFullYear() - dataNascimento.getFullYear();
      if (idade < idadeMinima) {
        throw new Error(`O candidato deve ter no mínimo ${idadeMinima} anos para se tornar deputado`);
      }
    }
  }
  export { Deputado };
