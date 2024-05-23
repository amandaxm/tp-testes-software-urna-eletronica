Integrantes: Amanda Xavier Mariano, Emyle Santos Lima, Laura Godinho Barroso, Mariane Mara de Souza


1. **Explicação do sistema:**
   O sistema implementa uma urna eletrônica com base na utilizada oficialmente nas eleições brasileiras. No caso, existem dois tipos de usuários: o Administrador e o Eleitor. Ao iniciar a aplicação, o primeiro passo é que o administrador insira a própria senha corretamente. Feito isso, pode escolher entre cadastrar presidente, cadastrar deputado ou iniciar votação. Nos casos de cadastro, o sistema direciona para uma tela na qual o administrador irá preencher nome, data de nascimento, partido e numero do candidato. Caso a opção escolhida seja iniciar votação, o administrador deverá inserir um título de eleitor válido. 
   Com o título de eleitor validado, o eleitor irá votar para deputado e, depois, para presidente. Em ambos casos, a interface gráfica mostra ao eleitor quantos dígitos possui o número da categoria de candidato em questão. Caso eleitor digite um número válido, a interface irá apresentadar nome, partido e foto do candidato. E, no caso do presidente, também é apresentada a foto do vice. Após conferir os dados, o eleitor pode confirmar ou corrigir o voto. Outra opção é o caso de o eleitor digitar um número inválido, o que resulta em uma mensagem de "voto em branco", novamente, o eleitor pode confirmar que irá votar em branco ou corrigir o voto. Por fim, o eleitor pode diretamente votar em banco ao selecionar a tecla "branco" e em seguida, deve confirmar se quer votar em branco ou corrigir o voto. Após encerrar a votação, é exibida a mensagem "FIM" e a tela volta para a parte de inserir título de eleitor. É feita uma verificação se o eleitor já votou, liberando acesso apenas caso contrário.
   Após votação de todos os eleitores, o administrador deve selecionar a opção "Finalizar votação e obter relatório". O relatório exibe o código verificador. O número do presidente e do deputado eleitos, a quantidade de votos para cada canditado a presidente e para cada deputado que obteve pelo menos um voto. Outros cenários possíveis são nenhum voto válido para determinada categoria de candidato ou empate. Para ambos casos, é exibida uma mensagem no relatório identificando a situação. Por fim, o relatório também exibe a quantidade de votos brancos, nulos, a quantidade total de eleitores a a data de emissão.


2. **Explicação das tecnologias usadas:**


3. **Instruções para execução**
   3.1 **Instalação das Dependências:***
      
      Antes de iniciar, certifique-se de ter o Node.js e npm instalados em seu sistema. No diretório raiz do projeto, execute o seguinte comando para instalar as dependências:

      npm install

   3.2 **Execução do Servidor:**

      Após a instalação das dependências e configuração das variáveis de ambiente, execute o seguinte comando para iniciar o servidor local:
      
      npm run dev

      O servidor estará acessível em `http://localhost:3000`.

   3.3 **Acesso à Aplicação:**

      Abra seu navegador e visite `http://localhost:3000`.

