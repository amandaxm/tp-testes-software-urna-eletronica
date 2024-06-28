const request = require('supertest');
const app = require('../../index.js');
const { verificarVotoDuplicado } = require('../../js/firestoreRepo.js');

jest.mock('../../js/firestoreRepo.js', () => ({
  getEtapasFromFirestore: jest.fn().mockResolvedValue(['etapa1', 'etapa2']), 
  verificarVotoDuplicado: jest.fn().mockResolvedValue(true)  // Mock para sempre retornar true
}));

describe('GET /etapas', () => {
  it('deve retornar as etapas', async () => {
    const response = await request(app).get('/etapas');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(['etapa1', 'etapa2']); 
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
