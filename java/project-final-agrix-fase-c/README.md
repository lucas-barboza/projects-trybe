# Projeto Agrix Fase C
# Contexto
A AgroTech é uma empresa especializada em tecnologias para melhorar a eficiência no cultivo de plantações, visando reduzir o desperdício de recursos e alimentos, e fazendo um uso mais responsável da terra disponível para plantio. O primeiro produto dessa empresa é o Agrix, um sistema para gestão e monitoramento de fazendas participantes.

Este projeto tem como objetivo desenvolver uma aplicação Spring Boot com algumas funcionalidades iniciais, que servirão de base para as próximas fases do Agrix.

* Expansão das rotas da API utilizando o ecossistema Spring.
* Implementação de buscas customizadas para melhorar a eficiência do sistema.
* Utilização de campos de data nas rotas da API e no banco de dados para facilitar a visualização e análise dos dados.
* Inclusão de autenticação com Spring Security para garantir a segurança da aplicação.
* Garantia de que diferentes rotas atendam a regras específicas de autorização.
* Utilização de JWT para autenticação e autorização.
* Configuração da aplicação para execução no Docker.

## Técnologias usadas

* Java.
* Spring Boot.
* Spring Data JPA.
* Spring Security.
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