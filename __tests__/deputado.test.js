import { Candidato } from '../entidades/Candidato.js';
import { Deputado } from '../entidades/Deputado.js';

describe('Deputado', () => {
  const NOME_VALIDO = 'João da Silva';
  const PARTIDO_VALIDO = 'Partido A';
  const NUMERO_VALIDO = '1234';
  const URL_FOTO_VALIDA = 'https://example.com/foto.jpg';
  const DATA_NASCIMENTO_VALIDA = '2000-01-01'; // Data que garante idade mínima de 21 anos

  let deputado;

  const setupDeputado = (overrides = {}) => {
    return new Deputado(
      overrides.nome || NOME_VALIDO,
      overrides.partido || PARTIDO_VALIDO,
      overrides.numero || NUMERO_VALIDO,
      overrides.urlImagem || URL_FOTO_VALIDA,
      overrides.dataNascimento || DATA_NASCIMENTO_VALIDA
    );
  };

  const expectValidationError = (campo, valor, expectedErrors) => {
    deputado[campo] = valor;
    expect(deputado.validar()).toEqual(expect.arrayContaining(expectedErrors));
  };

  beforeEach(() => {
    deputado = setupDeputado();
  });

  describe('Instanciação', () => {
    it('deve criar um objeto Deputado com sucesso', () => {
      expect(deputado).toBeInstanceOf(Deputado);
      expect(deputado).toBeInstanceOf(Candidato);
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
    it('deve retornar erros quando o número é vazio', () => {
      expectValidationError('numero', '', [
        'O número do candidato é obrigatório.',
        'Número do deputado deve ter 4 dígitos'
      ]);
    });

    it('deve retornar erros quando o número não é uma string', () => {
      expectValidationError('numero', 123, [
        'O número do candidato deve ser uma string.',
        'Número do deputado deve ter 4 dígitos'
      ]);
    });

    it('deve retornar erros quando o número é uma string vazia', () => {
      expectValidationError('numero', '   ', [
        'O número do candidato não pode ser uma string vazia.',
        'Número do deputado deve ter 4 dígitos'
      ]);
    });

    it('deve retornar erros quando o número não é um valor numérico', () => {
      expectValidationError('numero', 'abc', [
        'O número do candidato deve ser um valor numérico.',
        'Número do deputado deve ter 4 dígitos'
      ]);
    });

    it('deve retornar um erro quando o número não tem 4 dígitos', () => {
      expectValidationError('numero', '123', ['Número do deputado deve ter 4 dígitos']);
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

    it('deve retornar um erro quando o candidato tem menos de 21 anos', () => {
      expectValidationError('dataNascimento', '2005-01-01', ['O candidato deve ter no mínimo 21 anos para se tornar deputado']);
    });

    it('deve retornar um erro quando o candidato tem exatamente 21 anos, mas o mês ainda não chegou', () => {
      const hoje = new Date();
      const ano = hoje.getFullYear() - 21;
      const mes = hoje.getMonth() + 1; // Mês atual
      const dia = hoje.getDate(); // Dia atual
      const dataNascimento = new Date(ano, mes, dia); // Data de nascimento exatamente 21 anos atrás, mas no mês atual do ano seguinte
      deputado.dataNascimento = dataNascimento.toISOString().split('T')[0];
      expect(deputado.validar()).toContain('O candidato deve ter no mínimo 21 anos para se tornar deputado');
    });

    it('não deve retornar um erro quando o candidato tem exatamente 21 anos hoje', () => {
      const hoje = new Date();
      const ano = hoje.getFullYear() - 21;
      const mes = hoje.getMonth(); // Mês atual
      const dia = hoje.getDate(); // Dia atual
      const dataNascimento = new Date(ano, mes, dia); // Data de nascimento exatamente 21 anos atrás, no mesmo mês e dia atual
      deputado.dataNascimento = dataNascimento.toISOString().split('T')[0];
      expect(deputado.validar()).toEqual([]);
    });
    it('deve retornar um erro quando a data de nascimento está em um formato inválido', () => {
      expectValidationError('dataNascimento', '32-01-2000', ['Data de nascimento inválida']);
    });
  });
});
