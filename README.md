# Express Template Docker

Este projeto é um template para desenvolvimento de aplicações de backend utilizando Node.js, Express e PostgreSQL. Abaixo estão as instruções para instalação e uso.

## Estrutura do Projeto

```
express-backend-postgres
├── src
│   ├── index.js         # Ponto de entrada da aplicação
│   ├── db.js            # Configuração da conexão com o banco de dados
│   ├── swagger.js       # Configuração do swagger
│   └── routes
│       └── rota.js      # Definição das rotas da aplicação
├── sql
│   └── init.sql         # Script SQL para inicialização do banco de dados
├── Dockerfile           # Instruções para construir a imagem Docker
├── docker-compose.yml   # Configuração dos serviços da aplicação
├── .dockerignore        # Arquivos a serem ignorados na construção da imagem Docker
├── .gitignore           # Arquivos a serem ignorados pelo Git
├── package.json         # Configuração do npm e dependências
└── README.md            # Documentação do projeto
```

## Pré-requisitos

- Docker

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/Trojahn/express_template_docker.git
   cd express_template_docker
   ```
   
2. Configure o banco de dados:
   - Crie um banco de dados PostgreSQL no arquivo `sql/init.sql`.

3. Para iniciar a aplicação com Docker, execute:
   ```
   docker compose up --build
   ```
4. Caso seja necessário resetar o banco de dados, execute os comandos abaixo.
   ```
   docker compose down -v
   docker compose up --build
   ```
   
## Uso

- A aplicação estará disponível em `http://localhost:3000`.
- A documentação do back-end está disponível em `http://localhost:3000/api`

## Licença

Este projeto está licenciado sob a Licença MIT.