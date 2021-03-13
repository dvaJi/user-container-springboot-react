package com.dvaji.simplecrud.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import com.dvaji.simplecrud.model.User;
import lombok.Data;

@Data
public class SignupResponseDTO {
  private String id;
  private String email;
  private LocalDateTime created;
  private LocalDateTime modified;

  @JsonProperty("last_login")
  private LocalDateTime lastLogin;

  private String token;
  private boolean isActive;

  public SignupResponseDTO(User user, String token) {
    this.id = user.getUniqid();
    this.email = user.getEmail();
    this.created = user.getCreated();
    this.modified = user.getModified();
    this.lastLogin = user.getLastLogin();
    this.isActive = user.isActive();
    this.token = token;
  }
}
