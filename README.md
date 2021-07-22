# Cálculo de notas FTT - WEB

O front-end web, pode acessar a versão em produção neste
[link](https://calculo-notas-ftt.herokuapp.com/)

Desenvolvido utilizando:

- TypeScript
- React
- Axios (para chamadas da API)

## Botando para funcionar - Desenvolvimento

1. Obtendo repositório

Clone o repositório e renomeie.

```bash
git clone https://github.com/NathanReis/CalculoNotasFTT.git CalculoNotasFTT_WEB
```

2. Acessando branch do front-end WEB

Após clonagem, acesse o diretório criado e troque de brach para acessar os arquivos relacionados ao front-end WEB.

```bash
cd CalculoNotasFTT_WEB

git checkout web
```

3. Criando arquivo para variáveis de ambiente

Copie o arquivo ".env.example" e nomeie a cópia como ".env".

```bash
cp .env.example .env
```

4. Configurando variáveis de ambiente

Acesso o arquivo ".env" e preencha as variáveis que forem necessárias.

5. Iniciando container

Ao iniciar o container, será instalado as depências e iniciado a aplicação pelo Node.

```bash
docker-compose up -d
```

6. Acessando o front-end web

Nesse ponto já é possível acessar pelo navegador atrvés do endereço "localhost:3333".
