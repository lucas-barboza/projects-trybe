package com.betrybe.agrix.exception;

import org.springframework.http.HttpStatus;

/**
 * Class for farm not found.
 */
public class NotFound extends RuntimeException {

  private final HttpStatus status;
  private final String message;

  /**
   * Contructor exception.
   */
  public NotFound(String message, HttpStatus status) {
    this.message = message;
    this.status = status;
  }

  public HttpStatus getStatus() {
    return status;
  }

  public String getMessage() {
    return message;
  }
}