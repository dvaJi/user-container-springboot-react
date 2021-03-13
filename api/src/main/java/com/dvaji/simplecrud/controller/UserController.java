package com.dvaji.simplecrud.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dvaji.simplecrud.model.User;
import com.dvaji.simplecrud.repository.UserRepository;
import io.swagger.annotations.Api;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
@Api(tags = "users")
public class UserController {

  @Autowired
  private UserRepository userRepository;

  @GetMapping("/all")
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  public ResponseEntity<List<User>> allUsers() {
    return ResponseEntity.ok(userRepository.findByIsActive(true));
  }

  @GetMapping("/all_inactives")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<List<User>> allUsersInactives() {
    return ResponseEntity.ok(userRepository.findByIsActive(false));
  }
}
