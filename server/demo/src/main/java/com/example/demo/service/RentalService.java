package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Item;
import com.example.demo.model.Owner;
import com.example.demo.model.Tenant;
import com.example.demo.model.User;
import com.example.demo.repository.ItemRepository;
import com.example.demo.repository.OwnerRepository;
import com.example.demo.repository.TenantRepository;
import com.example.demo.repository.UserRepository;

@Service
public class RentalService {

    @Autowired
    private OwnerRepository ownerRepository;

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;


    // Login
    public User findUserByEmailAndPassword(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password))
                .orElse(null);
    }

    public Owner findOwnerById(Long id) {
        return ownerRepository.findById(id).orElse(null);
    }

    public Tenant findTenantById(Long id) {
        return tenantRepository.findById(id).orElse(null);
    }
    
    // CRUD
    public List<Owner> getAllOwners() {
        return ownerRepository.findAll();
    }

    public Owner createOwner(Owner owner) {
        return ownerRepository.save(owner);
    }

    public List<Tenant> getAllTenants() {
        return tenantRepository.findAll();
    }

    public Tenant createTenant(Tenant tenant) {
        return tenantRepository.save(tenant);
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Item createItem(Item item) {
        return itemRepository.save(item);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }
}
