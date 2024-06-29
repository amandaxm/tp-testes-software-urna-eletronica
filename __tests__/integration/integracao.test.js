const request = require('supertest');
const app = require('../../index.js');
const { verificarVotoDuplicado } = require('../../js/firestoreRepo.js');
const path = require('path');

jest.mock('../../js/firestoreRepo.js', () => ({
  getEtapasFromFirestore: jest.fn().mockResolvedValue(['etapa1', 'etapa2']),
  verificarVotoDuplicado: jest.fn().mockResolvedValue(true) // Mock para sempre retornar true
}));

describe('GET /etapas', () => {
  it('deve retornar as etapas', async () => {
    const response = await request(app).get('/etapas');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(['etapa1', 'etapa2']);
  });
});


describe('POST /salvar-votos', () => {
  it(' ', async () => {

    const votosValidos = [
      { etapa: 'PRESIDENTE', voto: '123' },
      { etapa: 'DEPUTADO', voto: '456' }
    ];

    const response = await request(app)
      .post('/salvar-votos')
      .send({ votos: votosValidos });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      success: false,
      message: 'Erro ao salvar os votos'
    });
  });
});

describe('POST /eleitor-voto-duplicado', () => {
  it('deve verificar se o eleitor já votou', async () => {
    const tituloEleitor = '123456789'; // Exemplo de título de eleitor
    const idVotacao = 'abcd1234'; // Exemplo de ID de votação

    // Simula a requisição POST para o endpoint /eleitor-voto-duplicado
    const response = await request(app)
      .post('/eleitor-voto-duplicado')
      .send({ titulo: tituloEleitor, idVotacao });

    // Verifica se a resposta tem status 200 (OK)
    expect(response.status).toBe(200);

    // Verifica se a resposta contém um objeto JSON com a propriedade `jaVotou`
    expect(response.body).toHaveProperty('jaVotou', true);

    // Verifica se `verificarVotoDuplicado` foi chamado corretamente
    expect(verificarVotoDuplicado).toHaveBeenCalledWith(tituloEleitor, idVotacao);
  });
});


describe('GET /obter-resultado', () => {
  it('deve retornar status 500 ao buscar os votos da sessão de votação com erro', async () => {
    const idSessao = 'sessao-inexistente'; // Simula um ID de sessão inválido

    // Faz a requisição GET para /obter-resultado com o ID da sessão inválido
    const response = await request(app)
      .get('/obter-resultado')
      .query({ idSessao });

    // Verifica se a resposta tem status 500 (Erro interno do servidor)
    expect(response.status).toBe(500);

    // Verifica se a resposta contém uma mensagem de erro apropriada
    expect(response.body).toEqual({ error: 'Erro ao buscar os votos da sessão de votação' });
  });


  
});


