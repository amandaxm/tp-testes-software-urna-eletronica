import { Candidato } from '../entidades/Candidato.js';

describe('Candidato', () => {
    describe('validar()', () => {
        it('deve criar um objeto Candidato com sucesso', () => {
        const candidato = new Candidato(
          'João da Silva',
          'Partido A',
          '12345',
          'https://example.com/foto.jpg',
          '01/01/1990'
        );
        expect(candidato).toBeInstanceOf(Candidato);
      });
  
      it('deve passar um teste simples', () => {
        expect(1).toBe(1);
      });
  
      it('deve retornar um erro quando o nome é vazio', () => {
        const candidato = new Candidato(
          '',
          'Partido A',
          '12345',
          'https://example.com/foto.jpg',
          '01/01/1990'
        );
        expect(candidato.validar()).toEqual(['O nome do candidato é obrigatório.']);
      });
  
      it('deve retornar um erro quando o nome não é uma string', () => {
        const candidato = new Candidato(
          123,
          'Partido A',
          '12345',
          'https://example.com/foto.jpg',
          '01/01/1990'
        );
        expect(candidato.validar()).toEqual(['O nome do candidato deve ser uma string.']);
      });
  
      it('deve retornar um erro quando o nome é uma string vazia', () => {
        const candidato = new Candidato(
          '   ',
          'Partido A',
          '12345',
          'https://example.com/foto.jpg',
          '01/01/1990'
        );
        expect(candidato.validar()).toEqual(['O nome do candidato não pode ser uma string vazia.']);
      });
  
      it('deve retornar um erro quando o nome não contém sobrenome', () => {
        const candidato = new Candidato(
          'João',
          'Partido A',
          '12345',
          'https://example.com/foto.jpg',
          '01/01/1990'
        );
        expect(candidato.validar()).toEqual(['O nome do candidato deve conter pelo menos um sobrenome.']);
      });
  
      it('deve criar um objeto Candidato com sucesso quando o nome tem 250 caracteres', () => {
        const name = 'A '+ 'A'.repeat(248);
        const candidato = new Candidato(
          name,
          'Partido A',
          '12345',
          'https://example.com/foto.jpg',
          '01/01/1990'
        );
        expect(candidato.validar()).toEqual([]);
      });
      
      it('deve retornar um erro quando o nome tem mais de 250 caracteres', () => {
        const nomeLongo = 'A'.repeat(251);
        const candidato = new Candidato(nomeLongo, 'Partido A', '12345', 'http://example.com/image.jpg', '1990-01-01');
        expect(candidato.validar()).toEqual(['O nome do candidato deve ter no máximo 250 caracteres.']);
      });
      
  
      it('deve retornar um erro quando o partido é vazio', () => {
        const candidato = new Candidato(
          'João da Silva',
          '',
          '12345',
          'https://example.com/foto.jpg',
          '01/01/1990'
        );
        expect(candidato.validar()).toEqual(['Partido não pode ser vazio']);
      });
  
      it('deve retornar um erro quando o partido não é uma string', () => {
        const candidato = new Candidato(
          'João da Silva',
          123,
          '12345',
          'https://example.com/foto.jpg',
          '01/01/1990'
        );
        expect(candidato.validar()).toEqual(['Partido deve ser uma string']);
      });
  
      it('deve retornar um erro quando o partido é uma string vazia', () => {
        const candidato = new Candidato(
          'João da Silva',
          '   ',
          '12345',
          'https://example.com/foto.jpg',
          '01/01/1990'
        );
        expect(candidato.validar()).toEqual(["O partido deve ser uma string não vazia e não pode conter apenas espaços em branco."]);
      });
  
      it('deve retornar um erro quando o número é vazio', () => {
        const candidato = new Candidato(
          'João da Silva',
          'Partido A',
          '',
          'https://example.com/foto.jpg',
          '01/01/1990'
        );
        expect(candidato.validar()).toEqual(['O número do candidato é obrigatório.']);
      });
  
      it('deve retornar um erro quando o número não é uma string', () => {
        const candidato = new Candidato(
          'João da Silva',
          'Partido A',
          123,
          'https://example.com/foto.jpg',
          '01/01/1990'
        );
        expect(candidato.validar()).toEqual(['O número do candidato deve ser uma string.']);
      });
  
      it('deve retornar um erro quando o número é uma string vazia', () => {
        const candidato = new Candidato(
          'João da Silva',
          'Partido A',
          '   ',
          'https://example.com/foto.jpg',
          '01/01/1990'
        );
        expect(candidato.validar()).toEqual(['O número do candidato não pode ser uma string vazia.']);
      });
  
      it('deve retornar um erro quando o número não é um valor numérico', () => {
        const candidato = new Candidato(
          'João da Silva',
          'Partido A',
          'abc',
          'https://example.com/foto.jpg',
          '01/01/1990'
        );
        expect(candidato.validar()).toEqual(['O número do candidato deve ser um valor numérico.']);
      });
  
      it('deve retornar um erro quando a URL da imagem é vazia', () => {
        const candidato = new Candidato(
          'João da Silva',
          'Partido A',
          '12345',
          '',
          '01/01/1990'
        );
        expect(candidato.validar()).toEqual(['A URL da imagem do candidato é obrigatória.']);
      });
  
      it('deve retornar um erro quando a URL da imagem não é uma string', () => {
        const candidato = new Candidato(
          'João da Silva',
          'Partido A',
          '12345',
          123,
          '01/01/1990'
        );
        expect(candidato.validar()).toEqual(['A URL da imagem do candidato deve ser uma string.']);
      });
  
      it('deve retornar um erro quando a URL da imagem é uma string vazia', () => {
        const candidato = new Candidato(
          'João da Silva',
          'Partido A',
          '12345',
          '   ',
          '01/01/1990'
        );
        expect(candidato.validar()).toEqual(['A URL da imagem do candidato não pode ser uma string vazia.']);
      });
  
      it('deve retornar um erro quando a data de nascimento é inválida', () => {
        const candidato = new Candidato(
          'João da Silva',
          'Partido A',
          '12345',
          'https://example.com/foto.jpg',
          'abc'
        );
        expect(candidato.validar()).toEqual(['Data de nascimento inválida']);
      });
    });
  });