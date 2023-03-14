# Digitro backend

Projeto que se conecta com o mongodb para fazer um CRUD com um schema de Agent

## Pré-requisitos

- [mongodb](https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_general_prosp-brand_gic-null_amers-br_ps-all_desktop_eng_lead&utm_term=mongo%20download&utm_medium=cpc_paid_search&utm_ad=p&utm_ad_campaign_id=1718986516&adgroup=80209769883&cq_cmp=1718986516&gclid=Cj0KCQjwk7ugBhDIARIsAGuvgPacHafgUARg9K4YqEXj7P0gho49lTj6qBr8i82xLIooImGnCBNvnUIaAs2vEALw_wcB)
- [Node 14 - Recomendo utilizar um gestor de versões](https://nodejs.dev/pt/download/package-manager)
- Docker
  - [Windows](https://www.docker.com/products/docker-desktop/)
  - [Linux Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
  - [Mac](https://docs.docker.com/desktop/install/mac-install/)

## Iniciando o projeto

1. Crie um arquivo `.env` com as variáveis de ambiente necessárias como no `.env.example`;
2. Execute `docker-compose up` para instalar as bibliotecas e iniciar o mongodb, mongo express e a aplicação.

Você pode acessar o **mongo express** no [http://localhost:8081](http://localhost:8081) e gerenciar o banco de dados
