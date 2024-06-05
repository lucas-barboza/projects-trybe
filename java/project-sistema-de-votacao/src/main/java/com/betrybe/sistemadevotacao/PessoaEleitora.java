package com.betrybe.sistemadevotacao;

public class PessoaEleitora extends Pessoa {
  private String cpf;

  /**
   * Construtor da classe PessoaEleitora.
   *
   * @param nome   O nome da pessoa eleitora.
   * @param cpf    O cpf da pessoa eleitora.
   */

  public PessoaEleitora(String nome, String cpf) {
    super(nome);
    this.cpf = cpf;
  }

  public String getCpf() {
    return cpf;
  }

  public void setCpf(String cpf) {
    this.cpf = cpf;
  }
}