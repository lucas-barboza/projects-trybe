package com.trybe.java.regraprogressao;

import java.util.Scanner;

/**
 * App.
 */
public class App {
  /**
   * Metodo main.
   */
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    System.out.println("Digite a quantidade de atividades para cadastrar:");
    int contActivies = scanner.nextInt();
    scanner.nextLine();
    float numerator = 0;
    float denominator = 0;

    String[] vectorNames = new String[contActivies];
    int[] allWeights = new int[contActivies];
    int[] allGrades = new int[contActivies];

    for (int i = 0; i < contActivies; i++) {
      System.out.printf("Digite o nome da atividade %d:%n",i + 1);
      String nameActive = scanner.nextLine();
      vectorNames[i] = nameActive;

      System.out.printf("Digite o peso da atividade %d:%n", i + 1);
      String weight = scanner.nextLine();
      allWeights[i] = Integer.parseInt(weight);

      System.out.printf("Digite a nota obtida para %s:%n", vectorNames[i]);
      String grade = scanner.nextLine();
      allGrades[i] = Integer.parseInt(grade);

      numerator += allWeights[i] * allGrades[i];
      denominator += allWeights[i];
    }
    float finalGrade = numerator / denominator;

    if (finalGrade < 85) {
      System.out.printf(
          "Lamentamos informar que, com base na sua pontuação alcançada neste período, %.1f%%"
           + ", você não atingiu a pontuação mínima necessária para sua aprovação.%n",
          finalGrade);
    } else {
      System.out.printf(
          "Parabéns! Você alcançou %.1f%%!%n"
           + "E temos o prazer de informar que você obteve aprovação!%n",
          finalGrade);
    }

    scanner.close();
  }
}