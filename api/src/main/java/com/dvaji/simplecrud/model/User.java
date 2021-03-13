package com.dvaji.simplecrud.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = "email") })
public class User extends AuditableEntity {
  private String uniqid;

  @Column(unique = true, nullable = false)
  @NotBlank(message = "Email es obligatorio")
  @Pattern(regexp = "^(.+)@(.+)$", message = "El correo no tiene formato correcto. ej: correo@dominio.com")
  private String email;

  @NotBlank(message = "Contraseña es obligatoria")
  @Pattern(regexp = "(?=.*[0-9]{2})(?=.*[a-z])(?=.*[A-Z]).*", message = "La contraseña debe contener; Una Mayúscula, dos números y letras minúsculas")
  private String password;

  private LocalDateTime lastLogin;

  @ElementCollection(fetch = FetchType.EAGER)
  List<Role> roles;

  @OneToMany(cascade = CascadeType.ALL)
  private List<Phone> phones = new ArrayList<>();

  private boolean isActive;

  public User(String email, String password) {
    this.email = email;
    this.password = password;
    this.lastLogin = LocalDateTime.now();
    this.isActive = true;
    this.uniqid = UUID.randomUUID().toString();
  }

  public void addPhone(Phone phone) {
    this.phones.add(phone);
  }
}
