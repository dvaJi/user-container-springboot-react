package com.dvaji.simplecrud.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.dvaji.simplecrud.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

  List<User> findByIsActive(boolean isActive);

  Optional<User> findByEmail(String email);

  Boolean existsByEmail(String email);

  @Modifying
  @Query("update User u set u.lastLogin = ?2 where u.uniqid = ?1")
  @Transactional
  void setLastLoginById(String id, LocalDateTime lastLogin);

  @Modifying
  @Query("update User u set u.isActive = ?2 where u.uniqid = ?1")
  @Transactional
  void setIsActiveById(String id, boolean isActive);
}