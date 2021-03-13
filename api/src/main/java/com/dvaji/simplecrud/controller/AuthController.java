package com.dvaji.simplecrud.controller;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dvaji.simplecrud.dto.JwtResponseDTO;
import com.dvaji.simplecrud.dto.LoginRequestDTO;
import com.dvaji.simplecrud.dto.PhoneDTO;
import com.dvaji.simplecrud.dto.SignupRequestDTO;
import com.dvaji.simplecrud.dto.SignupResponseDTO;
import com.dvaji.simplecrud.exception.ErrorMessage;
import com.dvaji.simplecrud.model.Phone;
import com.dvaji.simplecrud.model.Role;
import com.dvaji.simplecrud.model.User;
import com.dvaji.simplecrud.repository.PhoneRepository;
import com.dvaji.simplecrud.repository.UserRepository;
import com.dvaji.simplecrud.security.UserDetailsImpl;
import com.dvaji.simplecrud.security.jwt.JwtUtils;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  PhoneRepository phoneRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@RequestBody LoginRequestDTO loginRequest) {

    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
        .collect(Collectors.toList());

    // Update lastLogin
    userRepository.setLastLoginById(userDetails.getId(), LocalDateTime.now());

    return ResponseEntity.ok(new JwtResponseDTO(jwt, userDetails.getId(), userDetails.getEmail(), roles));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@RequestBody SignupRequestDTO signUpRequest) {
    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity.badRequest().body(new ErrorMessage("400", "El email ya está registrado."));
    }

    // Create user
    User user = new User(signUpRequest.getEmail(), encoder.encode(signUpRequest.getPassword()));
    List<Role> roles = Arrays.asList(Role.ROLE_USER);
    user.setRoles(roles);

    // Create phones
    for (PhoneDTO phone : signUpRequest.getPhones()) {
      user.addPhone(new Phone(phone.getNumber(), phone.getCityCode(), phone.getCountryCode()));
    }

    userRepository.save(user);

    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(signUpRequest.getEmail(), signUpRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String token = jwtUtils.generateJwtToken(authentication);

    return ResponseEntity.ok(new SignupResponseDTO(user, token));
  }
}