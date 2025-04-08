package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.LoginRequest;
import com.example.demo.model.Item;
import com.example.demo.model.Owner;
import com.example.demo.model.Tenant;
import com.example.demo.model.User;
import com.example.demo.service.RentalService;

@RestController
@RequestMapping("/api/rentals")
@CrossOrigin(origins = "http://localhost:5500")
public class RentalController {

    @Autowired
    private RentalService rentalService;

    // Get all owners
    @GetMapping("/owners")
    public List<Owner> getAllOwners() {
        List<Owner> owners = rentalService.getAllOwners();
        if (!owners.isEmpty()) {
            owners.remove(0); // Optional logic
        }
        return owners;
    }

    // Get all tenants
    @GetMapping("/tenants")
    public List<Tenant> getAllTenants() {
        return rentalService.getAllTenants();
    }

    // Get all items
    @GetMapping("/items")
    public List<Item> getAllItems() {
        return rentalService.getAllItems();
    }

    // Get all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return rentalService.getAllUsers();
    }

    // Create new owner
    @PostMapping("/owners")
    public Owner createOwner(@RequestBody Owner owner) {
        return rentalService.createOwner(owner);
    }

    // Create new tenant
    @PostMapping("/tenants")
    public Tenant createTenant(@RequestBody Tenant tenant) {
        return rentalService.createTenant(tenant);
    }

    // Create new item
    @PostMapping("/items")
    public Item createItem(@RequestBody Item item) {
        return rentalService.createItem(item);
    }

    // Create new user (Register)
    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return rentalService.createUser(user);
    }

    // 🔐 Owner login 
    @PostMapping("/owner/login")
    public ResponseEntity<?> loginOwner(@RequestBody LoginRequest request) {
        User user = rentalService.findUserByEmailAndPassword(request.getEmail(), request.getPassword());
    
        if (user == null || user.getRole() == null || !user.getRole().equalsIgnoreCase("OWNER")) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password"));
        }
    
        Owner owner = rentalService.findOwnerById(user.getId());
    
        if (owner == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password"));
        }
    
        return ResponseEntity.ok(owner);
    }

    @PostMapping("/tenant/login")
    public ResponseEntity<?> loginTenant(@RequestBody LoginRequest request) {
        User user = rentalService.findUserByEmailAndPassword(request.getEmail(), request.getPassword());

        if (user == null || user.getRole() == null || !user.getRole().equalsIgnoreCase("TENANT")) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password"));
        }

        Tenant tenant = rentalService.findTenantById(user.getId());

        if (tenant == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password"));
        }

        return ResponseEntity.ok(tenant);
}



}
