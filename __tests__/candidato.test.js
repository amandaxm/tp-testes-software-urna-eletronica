import { Candidato } from '../entidades/Candidato.js';
import { jest } from '@jest/globals';

describe('Candidato', () => {
  const NOME_VALIDO = 'João da Silva';
  const PARTIDO_VALIDO = 'Partido A';
  const NUMERO_VALIDO = '12345';
  const URL_FOTO_VALIDA = 'https://example.com/foto.jpg';
  const DATA_NASCIMENTO_VALIDA = '1990-01-01';

  let candidato;

  const setupCandidato = (overrides = {}) => {
    return new Candidato(
      overrides.nome || NOME_VALIDO,
      overrides.partido || PARTIDO_VALIDO,
      overrides.numero || NUMERO_VALIDO,
      overrides.urlImagem || URL_FOTO_VALIDA,
      overrides.dataNascimento || DATA_NASCIMENTO_VALIDA
    );
  };

  const expectValidationError = (campo, valor, expectedErrors) => {
    candidato[campo] = valor;
    expect(candidato.validar()).toEqual(expect.arrayContaining(expectedErrors));
  };

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2024-05-19').getTime());
    candidato = setupCandidato();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Instanciação', () => {
    it('deve criar um objeto Candidato com sucesso', () => {
      expect(candidato).toBeInstanceOf(Candidato);
    });
  });

  describe('Validação de Nome', () => {
    it('deve retornar um erro quando o nome é vazio', () => {
      expectValidationError('nome', '', ['O nome do candidato é obrigatório.']);
    });

    it('deve retornar um erro quando o nome não é uma string', () => {
      expectValidationError('nome', 123, ['O nome do candidato deve ser uma string.']);
    });

    it('deve retornar um erro quando o nome é uma string vazia', () => {
      expectValidationError('nome', '   ', ['O nome do candidato não pode ser uma string vazia.']);
    });

    it('deve retornar um erro quando o nome tem mais de 250 caracteres', () => {
      expectValidationError('nome', 'A'.repeat(251), ['O nome do candidato deve ter no máximo 250 caracteres.']);
    });

    it('deve retornar um erro quando o nome não contém sobrenome', () => {
      expectValidationError('nome', 'João', ['O nome do candidato deve conter pelo menos um sobrenome.']);
    });

    it('deve retornar um erro quando o nome é nulo', () => {
      expectValidationError('nome', null, ['O nome do candidato é obrigatório.']);
    });

    it('deve retornar um erro quando o nome tem exatamente 250 caracteres', () => {
      expectValidationError('nome', 'A'.repeat(250), []);
    });

    it('deve retornar um erro quando o nome tem mais de 250 caracteres', () => {
      expectValidationError('nome', 'A'.repeat(251), ['O nome do candidato deve ter no máximo 250 caracteres.']);
    });
  });

  describe('Validação de Partido', () => {
    it('deve retornar um erro quando o partido é vazio', () => {
      expectValidationError('partido', '', ['Partido não pode ser vazio']);
    });

    it('deve retornar um erro quando o partido não é uma string', () => {
      expectValidationError('partido', 123, ['Partido deve ser uma string']);
    });

    it('deve retornar um erro quando o partido é uma string vazia', () => {
      expectValidationError('partido', '   ', ['O partido deve ser uma string não vazia e não pode conter apenas espaços em branco.']);
    });
  });

  describe('Validação de Número', () => {
    it('deve retornar um erro quando o número é vazio', () => {
      expectValidationError('numero', '', ['O número do candidato é obrigatório.']);
    });

    it('deve retornar um erro quando o número não é uma string', () => {
      expectValidationError('numero', 123, ['O número do candidato deve ser uma string.']);
    });

    it('deve retornar um erro quando o número é uma string vazia', () => {
      expectValidationError('numero', '   ', ['O número do candidato não pode ser uma string vazia.']);
    });

    it('deve retornar um erro quando o número não é um valor numérico', () => {
      expectValidationError('numero', 'abc', ['O número do candidato deve ser um valor numérico.']);
    });
  });

  describe('Validação de URL da Imagem', () => {
    it('deve retornar um erro quando a URL da imagem é vazia', () => {
      expectValidationError('urlImagem', '', ['A URL da imagem do candidato é obrigatória.']);
    });

    it('deve retornar um erro quando a URL da imagem não é uma string', () => {
      expectValidationError('urlImagem', 123, ['A URL da imagem do candidato deve ser uma string.']);
    });

    it('deve retornar um erro quando a URL da imagem é uma string vazia', () => {
      expectValidationError('urlImagem', '   ', ['A URL da imagem do candidato não pode ser uma string vazia.']);
    });
  });

  describe('Validação de Data de Nascimento', () => {
    it('deve retornar um erro quando a data de nascimento é inválida', () => {
      expectValidationError('dataNascimento', 'abc', ['Data de nascimento inválida']);
    });

    it('deve retornar um erro quando a data de nascimento é nula', () => {
      expectValidationError('dataNascimento', null, ['Data de nascimento é obrigatória']);
    });

    it('não deve retornar um erro quando a data de nascimento é uma string vazia', () => {
      expectValidationError('dataNascimento', '', []);
    });
  });


  describe('Casos extremos', () => {
    it('deve retornar um erro quando o nome é nulo', () => {
      expectValidationError('nome', null, ['O nome do candidato é obrigatório.']);
    });

    it('deve retornar um erro quando a data de nascimento é nula', () => {
      expectValidationError('dataNascimento', null, ['Data de nascimento é obrigatória']);
    });

    it('não deve retornar um erro quando a data de nascimento é uma string vazia', () => {
      expectValidationError('dataNascimento', '', []);
    });
  });
});

