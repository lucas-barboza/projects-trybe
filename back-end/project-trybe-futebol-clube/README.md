# Projeto Trybe Futebol Clube

# Contexto
Este é o projeto de um sistema de gestão para um clube de futebol, desenvolvido no formato de uma API utilizando Node.js, TypeScript e Sequelize. O projeto é dockerizado, permitindo a execução em ambientes isolados, e segue os princípios de desenvolvimento RESTful. A API foi projetada para ser consumida por um front-end já provido no projeto.

Os principais objetivos do projeto incluíram:

* Desenvolver endpoints conectados ao banco de dados seguindo os princípios do REST.
* Implementar todas as camadas da aplicação (Models, Service e Controllers) utilizando Sequelize como ORM.
* Garantir a funcionalidade de Criação, Leitura, Atualização e Exclusão de dados (CRUD).
* Implementar autenticação utilizando JWT (JSON Web Token).
* Criar e gerenciar ambientes isolados com Docker e docker-compose.
* Escrever testes unitários para garantir a qualidade do código.

## Técnologias usadas

* SQL.
* MySQL Workbench.
* TypeScript.
* Sequelize.
* Node.js.
* Docker e docker-compose.
* Utilizar arquitetura MSC (Model-Service-Controller).
* JWT (JSON Web Token) para autenticação.
* Princípios REST.
* ESLint.
* Testes unitários.

## Instalando Dependências

* Pasta principal do projeto
```bash
npm install
``` 

## Executando Testes

* Para rodar todos os testes:

  ```
    npm test
  ```