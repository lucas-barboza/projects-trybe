# Projeto Restaurant Orders

# Contexto
Este projeto teve como objetivo principal a criação de uma ferramenta de construção de cardápios para um restaurante, levando em consideração restrições alimentares e disponibilidade de ingredientes em estoque. O desenvolvimento foi baseado em melhorar a gestão de receitas e estoque, antes feita de forma ineficiente por meio de arquivos CSV. Durante o projeto, foram aplicados testes para classes existentes, implementada uma nova classe para mapear pratos e receitas, e criadas classes para gerar cardápios e gerenciar estoque. O código foi estruturado visando a clareza, manutenção e legibilidade, seguindo princípios de orientação a objetos.

Os principais objetivos do projeto incluíram:

* Implementação de lógica para criar e gerenciar cardápios considerando restrições alimentares e disponibilidade de ingredientes.
* Criação de testes automatizados para validar a correção e eficácia das funcionalidades implementadas no programa.
* Utilização de estruturas como Hashmaps, Dict e Set do Python para mapear pratos, receitas, restrições alimentares e disponibilidade de ingredientes em estoque.
* Aplicação dos conceitos de orientação a objetos para criar classes que representam pratos, receitas, cardápios e gestão de estoque de ingredientes.

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