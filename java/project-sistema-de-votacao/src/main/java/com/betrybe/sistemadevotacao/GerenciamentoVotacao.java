package com.betrybe.sistemadevotacao;

import java.util.ArrayList;

public class GerenciamentoVotacao implements GerenciamentoVotacaoInterface {
  private ArrayList<PessoaCandidata> pessoasCandidatas;
  private ArrayList<PessoaEleitora> pessoasEleitoras;
  private ArrayList<String> cpfsComputados;

  /**
   * Construtor da classe Gerenciamento de votacao.
   * Inicializa os ArrayLists.
   */

  public GerenciamentoVotacao() {
    pessoasCandidatas = new ArrayList<>();
    pessoasEleitoras = new ArrayList<>();
    cpfsComputados = new ArrayList<>();
  }

  @Override
  public void cadastrarPessoaCandidata(String nome, int numero) {
    for (PessoaCandidata candidato : pessoasCandidatas) {
      if (candidato.getNumero() == numero) {
        System.out.println("Número da pessoa candidata já utilizado!");
        return;
      }
    }
    PessoaCandidata candidato = new PessoaCandidata(nome, numero);
    pessoasCandidatas.add(candidato);
  }

  @Override
  public void cadastrarPessoaEleitora(String nome, String cpf) {
    for (PessoaEleitora eleitor : pessoasEleitoras) {
      if (eleitor.getCpf() == cpf) {
        System.out.println("Pessoa eleitora já cadastrada!");
        return;
      }
    }
    PessoaEleitora eleitor = new PessoaEleitora(nome, cpf);
    pessoasEleitoras.add(eleitor);
  }

  @Override
  public void votar(String cpfPessoaEleitora, int numeroPessoaCandidata) {
    if (cpfsComputados.contains(cpfPessoaEleitora)) {
      System.out.println("Pessoa eleitora já votou!");
      return;
    }

    PessoaCandidata votado = null;
    for (PessoaCandidata candidato : pessoasCandidatas) {
      if (candidato.getNumero() == numeroPessoaCandidata) {
        votado = candidato;
        break;
      }
    }

    if (votado != null) {
      votado.receberVoto();
      cpfsComputados.add(cpfPessoaEleitora);
    }
    //
  }

  @Override
  public void mostrarResultado() {
    if (cpfsComputados.isEmpty()) {
      System.out.println("É preciso ter pelo menos um voto para mostrar o resultado.");
      return;
    }

    for (PessoaCandidata candidato : pessoasCandidatas) {
      System.out.println("Nome: " + candidato.getNome()
          + " - " + candidato.getVotos() + " votos ( "
          + Math.round(candidato.getVotos() * 100 / cpfsComputados.size())
          + " )");
    }
    System.out.println("Total de votos: " + cpfsComputados.size());
  }
}