# Template Node + Express + PostgreSQL

> Template usado para o desenvolvimento de backends utilizando Node, Express e PostgreSQL.

## ⚠️ Avisos

Este sistema foi configurado para ambiente de desenvolvimento. Para implantação em produção, revise as variáveis de ambiente, configurações de CORS, segurança do banco de dados, entre outros.

## 🚀 Como utilizar este template?

1. Preencha o arquivo `init.sql` com o banco de dados desejado.
1. Após preenchido, execute o seguinte comando:
```
docker compose up --build -d
```

Caso queira resetar ou recriar o banco de dados (lembre-se que os dados atuais serão perdidos!), execute o comando:

```
docker compose down -v
```

Após inicializado, o webservice pode ser acessado em `http://localhost:3000/`. A interface gráfica de controle do banco de dados pode ser acessada em `http://localhost:8081`.


## Deploy

Configure os detalhes de deploy no arquivo `.env`, seguindo o exemplo presente em `.env.example`.