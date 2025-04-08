package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Tenant;

public interface TenantRepository extends JpaRepository<Tenant, Long> {
    // Add custom methods if needed
}
