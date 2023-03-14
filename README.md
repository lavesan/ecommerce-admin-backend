# Digitro backend

Projeto que se conecta com o mongodb para fazer um CRUD com um schema de Agent

## Pré-requisitos

- [Node 16+ - Recomendo utilizar um gestor de versões](https://nodejs.dev/pt/download/package-manager)
- Docker
  - [Windows](https://www.docker.com/products/docker-desktop/)
  - [Linux Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
  - [Mac](https://docs.docker.com/desktop/install/mac-install/)

## Iniciando o projeto

1. Crie um arquivo `.env` com as variáveis de ambiente necessárias como no `.env.example`;
2. Execute `docker-compose up` para instalar as bibliotecas e iniciar o mongodb, mongo express e a aplicação.

Você pode acessar o **mongo express** no [http://localhost:8081](http://localhost:8081) e gerenciar o banco de dados

## Token de autenticação

Para utilizar a autenticação nos endpoints, pode criar um token [aqui](https://jwt.io/) colocando a chave secreta do `JWT_SECRET` do seu .env juntamente com uma propriedade `domain` no payload

## Endpoints

A documentação dos endpoints está [aqui](https://gitlab.com/d4063/Desafios/-/blob/master/backend/openapi.yml)
