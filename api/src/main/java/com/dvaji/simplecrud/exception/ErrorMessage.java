package com.dvaji.simplecrud.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorMessage {
  private String codigo;
  private String mensaje;
}
