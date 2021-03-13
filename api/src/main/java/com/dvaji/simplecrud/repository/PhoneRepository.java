package com.dvaji.simplecrud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dvaji.simplecrud.model.Phone;

public interface PhoneRepository extends JpaRepository<Phone, Integer> {
}