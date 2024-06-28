import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import fetchMock from 'jest-fetch-mock';

const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');
console.log('teste')
let dom;
let document;




describe('Urna Eletrônica', () => {
    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
        document = dom.window.document;
        fetchMock = fetchMock.enableMocks();
    });

    test('Iniciar a votação', () => {
        const iniciarButton = document.getElementById('iniciarVotacao');
        iniciarButton.click();

        const contentContainer = document.querySelector('.contentContainer');
        const urnaContainer = document.querySelector('.urna');

        expect(contentContainer.style.display).toBe('none');
        expect(urnaContainer.style.display).toBe('flex');
    });

    test('Votar em um candidato válido', () => {
        document.querySelector('.numero.pisca').innerHTML = '1';
        document.querySelector('.numero.pisca').classList.remove('pisca');
        document.querySelector('.numero').nextElementSibling.classList.add('pisca');
        document.querySelector('.numero.pisca').innerHTML = '2';
        document.querySelector('.numero.pisca').classList.remove('pisca');

        const confirmaButton = document.getElementById('confirma');
        confirmaButton.click();

        const votos = JSON.parse(document.querySelector('body').dataset.votos);
        expect(votos[0].voto).toBe('12');
    });

    test('Voto em branco', () => {
        const brancoButton = document.getElementById('branco');
        brancoButton.click();

        const descricao = document.querySelector('.descricao');
        expect(descricao.innerHTML).toContain('VOTO EM BRANCO');
    });

    test('Corrigir voto', () => {
        document.querySelector('.numero.pisca').innerHTML = '1';
        document.querySelector('.numero.pisca').classList.remove('pisca');
        document.querySelector('.numero').nextElementSibling.classList.add('pisca');
        document.querySelector('.numero.pisca').innerHTML = '2';
        document.querySelector('.numero.pisca').classList.remove('pisca');

        const corrigeButton = document.getElementById('corrige');
        corrigeButton.click();

        const numeroDigitado = document.querySelector('.numero.pisca').innerHTML;
        expect(numeroDigitado).toBe('');
    });

    test('Finalizar votação e gerar relatório', async () => {
        const confirmaButton = document.getElementById('confirma');
        confirmaButton.click();

        await new Promise(resolve => setTimeout(resolve, 2000));

        const relatorioContainer = document.querySelector('.relatorio-container');
        expect(relatorioContainer.style.display).toBe('block');
    });
});
