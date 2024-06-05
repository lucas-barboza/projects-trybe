# Projeto Agrix Fase A
# Contexto
A AgroTech é uma empresa especializada em tecnologias para melhorar a eficiência no cultivo de plantações, visando reduzir o desperdício de recursos e alimentos, e fazendo um uso mais responsável da terra disponível para plantio. O primeiro produto dessa empresa é o Agrix, um sistema para gestão e monitoramento de fazendas participantes.

Este projeto tem como objetivo desenvolver uma aplicação Spring Boot com algumas funcionalidades iniciais, que servirão de base para as próximas fases do Agrix.

* Criar rotas da API utilizando o ecossistema Spring.
* Utilizar injeção de dependência para conectar as camadas de controle, serviço e persistência.
* Implementar entidades e repositórios utilizando o Spring Data JPA para persistência em banco de dados.
* Gerenciar erros no Spring Web.
* Configurar a aplicação para execução no Docker.

## Técnologias usadas

* Java.
* Spring Boot.
* Spring Data JPA.
* Docker.

## Instalando Dependências

  * Instale as dependências:
  ```bash
  mvn install
  ``` 

## Executando Testes

* Para rodar todos os testes:

  ```
    mvn test
  ```