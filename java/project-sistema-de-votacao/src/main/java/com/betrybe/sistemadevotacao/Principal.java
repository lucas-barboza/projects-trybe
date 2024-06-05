package com.betrybe.sistemadevotacao;

import java.util.Scanner;

public class Principal {

  /**
   * Classe principal.
   */
  public static void main(String[] args) {
    GerenciamentoVotacao gerenciamentoVotacao = new GerenciamentoVotacao();
    Scanner scanner = new Scanner(System.in);

    short opcaoPessoaCandidata = 0;
    short opcaoPessoaEleitora = 0;
    short opcaoVotar = 0;

    while (opcaoPessoaCandidata == 0) {
      System.out.println("Cadastrar pessoa candidata?\n"
          + "1 - Sim\n"
          + "2 - Não\n"
          + "Entre com o número correspondente à opção desejada:\n");
      opcaoPessoaCandidata = scanner.nextShort();

      if (opcaoPessoaCandidata == 1) {
        System.out.println("Entre com o nome da pessoa candidata:");
        String nome = scanner.next();
        System.out.println("Entre com o número da pessoa candidata:");
        int numero = Integer.parseInt(scanner.next());

        gerenciamentoVotacao.cadastrarPessoaCandidata(nome, numero);
        opcaoPessoaCandidata = 0;
      } else if (opcaoPessoaCandidata == 2) {
        break;
      } else {
        System.out.println("Entre com uma opção válida!");
        opcaoPessoaCandidata = 0;
      }
    }

    while (opcaoPessoaEleitora == 0) {
      System.out.println("Cadastrar pessoa eleitora?\n"
          + "1 - Sim\n"
          + "2 - Não\n"
          + "Entre com o número correspondente à opção desejada:\n");
      opcaoPessoaEleitora = scanner.nextShort();

      if (opcaoPessoaEleitora == 1) {
        System.out.println("Entre com o nome da pessoa eleitora:");
        String nome = scanner.next();
        System.out.println("Entre com o cpf da pessoa eleitora:");
        String cpf = scanner.next();

        gerenciamentoVotacao.cadastrarPessoaEleitora(nome, cpf);
        opcaoPessoaEleitora = 0;
      } else if (opcaoPessoaEleitora == 2) {
        break;
      } else {
        System.out.println("Entre com uma opção válida!");
        opcaoPessoaEleitora = 0;
      }
    }

    while (opcaoVotar == 0) {
      System.out.println("Entre com o número correspondente à opção desejada:\n"
          + "1 - Votar\n"
          + "2 - Resultado Parcial\n"
          + "3 - Finalizar Votação\n");
      opcaoVotar = scanner.nextShort();

      if (opcaoVotar == 1) {
        System.out.println("Entre com o cpf da pessoa eleitora:");
        String cpf = scanner.next();
        System.out.println("Entre com o número da pessoa candidata:");
        int numero = Integer.parseInt(scanner.next());

        gerenciamentoVotacao.votar(cpf, numero);
        opcaoVotar = 0;
      } else if (opcaoVotar == 2) {
        gerenciamentoVotacao.mostrarResultado();
        opcaoVotar = 0;
      } else if (opcaoVotar == 3) {
        break;
      } else {
        System.out.println("Entre com uma opção válida!");
        opcaoVotar = 0;
      }
    }
    gerenciamentoVotacao.mostrarResultado();
    scanner.close();
  }
}