# Cálculo de notas FTT - API

Uma API Rest responsável apenas pelos cálculos.

Desenvolvida utilizando:

- PHP 8.0
- Slim Framework 4.8 (para roteamento das rotas)
- PHPDotEnv 5.3 (para uso de variáveis de ambiente)

## Botando pra funcionar - Desenvolvimento

1. Obtendo repositório

Clone o repositório e renomeie.

```bash
git clone https://github.com/NathanReis/CalculoNotasFTT.git CalculoNotasFTT_API
```

2. Acessando branch da API

Após clonagem, acesse o diretório criado e troque de brach para acessar os arquivos relacionados a API.

```bash
cd CalculoNotasFTT_API

git checkout api
```

3. Criando arquivo para variáveis de ambiente

Copie o arquivo ".env.example" e nomeie a cópia como ".env".

```bash
cp .env.example .env
```

4. Configurando variáveis de ambiente

Acesso o arquivo ".env" e preencha as variáveis que forem necessárias.

5. Iniciando container

Ao iniciar o container, será instalado as depências e iniciado o servidor Apache.

```bash
docker-compose up -d
```

6. Acessando a api

Nesse ponto a API já esta pronta para uso, para facilitar seu uso, importe o arquivo "InsomniaApiCollection.json" em
algum Postman da vida.
