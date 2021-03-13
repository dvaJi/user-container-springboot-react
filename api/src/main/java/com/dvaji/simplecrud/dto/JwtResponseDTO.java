package com.dvaji.simplecrud.dto;

import java.util.List;

import lombok.Data;

@Data
public class JwtResponseDTO {
  private String token;
  private String id;
  private String email;
  private List<String> roles;

  public JwtResponseDTO(String accessToken, String id, String email, List<String> roles) {
    this.token = accessToken;
    this.id = id;
    this.email = email;
    this.roles = roles;
  }
}
