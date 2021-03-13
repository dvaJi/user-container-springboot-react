package com.dvaji.simplecrud.dto;

import java.util.List;

import lombok.Data;

@Data
public class SignupRequestDTO {
  private String email;
  private String password;
  private List<PhoneDTO> phones;
}
