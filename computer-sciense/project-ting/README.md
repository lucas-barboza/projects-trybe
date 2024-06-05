# Projeto TING - Trybe Is Not Google

# Contexto
Neste projeto foi implementado um programa que simula um algoritmo de indexação de documentos similar ao do Google. O objetivo foi identificar ocorrências de termos em arquivos TXT. O projeto consistiu em dois módulos principais:

## Módulo de Gerenciamento de Arquivos:
Permitirá anexar arquivos de texto no formato TXT.
## Módulo de Buscas:
Permitirá operar funções de busca sobre os arquivos anexados.

Os principais objetivos do projeto incluíram:

* Manipulação de Pilhas.
* Manipulação de Deque.
* Manipulação de Nós e Listas Ligadas.
* Manipulação de Listas Duplamente Ligadas.

## Técnologias usadas

* Python.
* Pytest.
* Flake8.

## Instalando Dependências

* Crie o armbiete virtual:
  ```bash
  python3 -m venv .venv && source .venv/bin/activate
  ``` 
  * Instale as dependências:
  ```bash
  python3 -m pip install -r dev-requirements.txt
  ``` 

## Executando Testes

* Para rodar todos os testes:

  ```
    python3 -m pytest
  ```