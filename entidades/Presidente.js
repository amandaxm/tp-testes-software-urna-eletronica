import { Candidato } from './Candidato.js';

class Presidente extends Candidato {
    constructor(nome, partido, numero, urlImagem, dataNascimento) {
      super(nome, partido, numero, urlImagem, dataNascimento);
      this.validarNumeroPresidente(numero);
      this.validarIdadePresidente(dataNascimento);
    }
  
    validarNumeroPresidente(numero) {
      if (numero.length !== 2) {
        throw new Error('Número do presidente deve ter 2 dígitos');
      }
    }
  
    validarVicePresidente(vicePresidente) {
      if (!vicePresidente || typeof vicePresidente !== 'string' || vicePresidente.trim() === '') {
        throw new Error('Vice-presidente inválido');
      }
    }
  
    validarIdadePresidente(dataNascimento) {
      const idadeMinima = 35; // Idade mínima para se tornar presidente
      const hoje = new Date();
      const idade = hoje.getFullYear() - dataNascimento.getFullYear();
      if (idade < idadeMinima) {
        throw new Error(`O candidato deve ter no mínimo ${idadeMinima} anos para se tornar presidente`);
      }
    }

    adicionarVicePresidente(vicePresidente) {
        if (!vicePresidente || !(vicePresidente instanceof Candidato)) {
          throw new Error('Vice-presidente inválido');
        }
        this.nomeVicePresidente = vicePresidente.nome;
        this.dataNasciemntoVicePresidente = vicePresidente.dataNascimento;
        this.numeroVicePresidente = vicePresidente.numero;
        this.partidoVicePresidente = vicePresidente.partido;
        this.urlImagemVicePresidente = vicePresidente.urlImagem;
      }


}
export { Presidente };
