package com.example.demo.service;

import com.example.demo.model.Owner;
import com.example.demo.model.Tenant;
import com.example.demo.model.Item;
import com.example.demo.model.User;
import com.example.demo.repository.OwnerRepository;
import com.example.demo.repository.TenantRepository;
import com.example.demo.repository.ItemRepository;
import com.example.demo.repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RentalService {

    private static final Logger logger = LoggerFactory.getLogger(RentalService.class);

    private final OwnerRepository ownerRepository;
    private final TenantRepository tenantRepository;
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;

    public RentalService(OwnerRepository ownerRepository,
                         TenantRepository tenantRepository,
                         ItemRepository itemRepository,
                         UserRepository userRepository) {
        this.ownerRepository = ownerRepository;
        this.tenantRepository = tenantRepository;
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
    }

    // Get all owners
    public List<Owner> getAllOwners() {
        return ownerRepository.findAll();
    }

    // Get all tenants
    public List<Tenant> getAllTenants() {
        return tenantRepository.findAll();
    }

    // Get all items
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Create a new owner
    public Owner createOwner(Owner owner) {
        logger.info("Creating new owner: {}", owner.getName());
        return ownerRepository.save(owner);
    }

    // Create a new tenant
    public Tenant createTenant(Tenant tenant) {
        logger.info("Creating new tenant: {}", tenant.getName());
        return tenantRepository.save(tenant);
    }

    // Create a new item
    
    public Item createItem(Item item) {
    //logger.info("Creating new item: {}", item.getItemName());
    return itemRepository.save(item);
    }

    // Create a new user and map to owner/tenant table if applicable
    @Transactional
    public User createUser(User user) {
        logger.info("Creating user: {}", user.getName());
    
        // Check if user already exists by name
        if (userRepository.findByName(user.getName()).isPresent()) {
            throw new RuntimeException("User already exists with name: " + user.getName());
        }
    
        // Save the user (ID is auto-generated here)
        User savedUser = userRepository.save(user);
    
        // Handle role-based entity creation
        switch (user.getRole().toUpperCase()) {
            case "OWNER":
                Owner owner = new Owner();
                owner.setId(savedUser.getId()); // Use same ID as user
                owner.setName(savedUser.getName());
                owner.setContact(savedUser.getPhoneNumber());
                owner.setUser(savedUser); // If you have a relationship mapped
                ownerRepository.save(owner);
                logger.info("Mapped user '{}' to Owner", savedUser.getName());
                break;
    
            case "TENANT":
                Tenant tenant = new Tenant();
                tenant.setId(savedUser.getId()); // Use same ID as user
                tenant.setName(savedUser.getName());
                tenant.setContact(savedUser.getPhoneNumber());
                tenantRepository.save(tenant);
                logger.info("Mapped user '{}' to Tenant", savedUser.getName());
                break;
    
            default:
                logger.warn("Unknown role: '{}'. No mapping created.", user.getRole());
                break;
        }
    
        return savedUser;
    }
    

    // Find user by name for login
    public User findUserByName(String name) {
        return userRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("User not found with name: " + name));
    }
}
