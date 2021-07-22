# Cálculo de notas FTT

Quem nunca usou uma planilha para calcular qual a nota final que você já tinha
antes de ter finalizado o semestre?

Eu já, mas sempre tinha que estar no PC para fazer isso, então para facilitar
minha vida fiz essa aplicaçãozinha e deixei publicada no
[Heroku](https://www.heroku.com/).

Ela é divida em duas partes:

1. Uma API feita com PHP responsável apenas pelos cálculos;
2. Um front-end WEB feito com React.

Poderia ter sido feito tudo com uma única linguagem?

Com certeza, mas não quis, optei por um projeto com multilinguagem e caso eu
anime, ainda farei uma versão mobile com Kotlin para poder dizer que o projeto
tambem é multiplataforma.

Este repositório possuí 3 branches:

- main: explicação da ideia e apresentação do repositório;
- api: código da API;
- web: código do front-end WEB.

Poderia ter deixado tudo na branch main?

Não, para fazer o deploy no Heroku é preciso específicar uma branch do
repositório, se eu deixasse tudo junto até poderia funcionar, mas seria bagunça.

Para ver o resultado publicado, acesse o
[link](https://calculo-notas-ftt.herokuapp.com/).
