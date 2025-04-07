package com.example.demo.controller;

import com.example.demo.model.Owner;
import com.example.demo.model.Tenant;
import com.example.demo.model.Item;
import com.example.demo.model.User;
import com.example.demo.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rentals")
@CrossOrigin(origins = "http://localhost:5500") 
public class RentalController {

    @Autowired
    private RentalService rentalService;

    // Get all owners
    @GetMapping("/owners")
    public List<Owner> getAllOwners() {
        return rentalService.getAllOwners();
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

    // Login user
    
}
