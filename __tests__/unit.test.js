const testCase = require('../js/script')


describe('verificarAdministrador', () => {
    let etapas;
    let senhaAdm;

    beforeEach(() => {
        // Configurando o ambiente DOM
        document.body.innerHTML = `
            <input id="codigoAdministrador" />
            <div class="administrador" style="display: block;"></div>
            <div class="iniciarVotacao" style="display: none;"></div>
            <div class="contentContainer" style="display: none;"></div>
            <div class="relatorio-container" style="display: block;"></div>
        `;

        etapas = {
            object: [
                {
                    administradores: [
                        { senha: '1234' }
                    ]
                }
            ]
        };

        global.etapas = etapas;
        global.senhaAdm = false;
        global.alert = jest.fn();
    });

    test('deve exibir iniciarVotacao e contentContainer quando o código do administrador está correto', () => {
        document.getElementById('codigoAdministrador').value = '1234';

        verificarAdministrador();

        expect(document.querySelector('.administrador').style.display).toBe('none');
        expect(document.querySelector('.iniciarVotacao').style.display).toBe('block');
        expect(document.querySelector('.contentContainer').style.display).toBe('block');
        expect(document.querySelector('.relatorio-container').style.display).toBe('none');
        expect(global.senhaAdm).toBe(true);
        expect(global.alert).not.toHaveBeenCalled();
    });

    test('deve exibir um alerta quando o código do administrador está incorreto', () => {
        document.getElementById('codigoAdministrador').value = 'wrong';

        verificarAdministrador();

        expect(global.alert).toHaveBeenCalledWith('Código do administrador incorreto. Tente novamente.');
        expect(global.senhaAdm).toBe(false);
    });
});