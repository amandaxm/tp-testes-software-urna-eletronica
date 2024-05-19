import { Candidato } from '../entidades/Candidato.js';

describe('Candidato', () => {
  const NOME_VALIDO = 'João da Silva';
  const PARTIDO_VALIDO = 'Partido A';
  const NUMERO_VALIDO = '12345';
  const URL_FOTO_VALIDA = 'https://example.com/foto.jpg';
  const DATA_NASCIMENTO_VALIDA = '01/01/1990';

  let candidato;

  beforeEach(() => {
    candidato = new Candidato(
      NOME_VALIDO,
      PARTIDO_VALIDO,
      NUMERO_VALIDO,
      URL_FOTO_VALIDA,
      DATA_NASCIMENTO_VALIDA
    );
  });

  describe('Instanciação', () => {
    it('deve criar um objeto Candidato com sucesso', () => {
      expect(candidato).toBeInstanceOf(Candidato);
    });
  });

  describe('Validação de Nome', () => {
    it('deve retornar um erro quando o nome é vazio', () => {
      candidato.nome = '';
      expect(candidato.validar()).toEqual(['O nome do candidato é obrigatório.']);
    });

    it('deve retornar um erro quando o nome não é uma string', () => {
      candidato.nome = 123;
      expect(candidato.validar()).toEqual(['O nome do candidato deve ser uma string.']);
    });

    it('deve retornar um erro quando o nome é uma string vazia', () => {
      candidato.nome = '   ';
      expect(candidato.validar()).toEqual(['O nome do candidato não pode ser uma string vazia.']);
    });

    it('deve retornar um erro quando o nome tem mais de 250 caracteres', () => {
      candidato.nome = 'A'.repeat(251);
      expect(candidato.validar()).toEqual(['O nome do candidato deve ter no máximo 250 caracteres.']);
    });

    it('deve retornar um erro quando o nome não contém sobrenome', () => {
      candidato.nome = 'João';
      expect(candidato.validar()).toEqual(['O nome do candidato deve conter pelo menos um sobrenome.']);
    });
  });

  describe('Validação de Partido', () => {
    it('deve retornar um erro quando o partido é vazio', () => {
      candidato.partido = '';
      expect(candidato.validar()).toEqual(['Partido não pode ser vazio']);
    });

    it('deve retornar um erro quando o partido não é uma string', () => {
      candidato.partido = 123;
      expect(candidato.validar()).toEqual(['Partido deve ser uma string']);
    });

    it('deve retornar um erro quando o partido é uma string vazia', () => {
      candidato.partido = '   ';
      expect(candidato.validar()).toEqual(["O partido deve ser uma string não vazia e não pode conter apenas espaços em branco."]);
    });
  });

  describe('Validação de Número', () => {
    it('deve retornar um erro quando o número é vazio', () => {
      candidato.numero = '';
      expect(candidato.validar()).toEqual(['O número do candidato é obrigatório.']);
    });

    it('deve retornar um erro quando o número não é uma string', () => {
      candidato.numero = 123;
      expect(candidato.validar()).toEqual(['O número do candidato deve ser uma string.']);
    });

    it('deve retornar um erro quando o número é uma string vazia', () => {
      candidato.numero = '   ';
      expect(candidato.validar()).toEqual(['O número do candidato não pode ser uma string vazia.']);
    });

    it('deve retornar um erro quando o número não é um valor numérico', () => {
      candidato.numero = 'abc';
      expect(candidato.validar()).toEqual(['O número do candidato deve ser um valor numérico.']);
    });
  });

  describe('Validação de URL da Imagem', () => {
    it('deve retornar um erro quando a URL da imagem é vazia', () => {
      candidato.urlImagem = '';
      expect(candidato.validar()).toEqual(['A URL da imagem do candidato é obrigatória.']);
    });

    it('deve retornar um erro quando a URL da imagem não é uma string', () => {
      candidato.urlImagem = 123;
      expect(candidato.validar()).toEqual(['A URL da imagem do candidato deve ser uma string.']);
    });

    it('deve retornar um erro quando a URL da imagem é uma string vazia', () => {
      candidato.urlImagem = '   ';
      expect(candidato.validar()).toEqual(['A URL da imagem do candidato não pode ser uma string vazia.']);
    });
  });

  describe('Validação de Data de Nascimento', () => {
    it('deve retornar um erro quando a data de nascimento é inválida', () => {
      candidato.dataNascimento = 'abc';
      expect(candidato.validar()).toEqual(['Data de nascimento inválida']);
    });
  });
});
