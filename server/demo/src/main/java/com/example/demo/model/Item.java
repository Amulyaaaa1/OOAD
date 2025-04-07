package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Double price;

    private String availability; // e.g., "Available", "Booked", "Not Available"

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private Owner owner;

    // No need to attach Tenant here directly — it's managed via RentalRequest
    // So we can remove the tenant field

    // Constructors
    public Item() {}

    public Item(String name, String description, Double price, String availability, Owner owner) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.availability = availability;
        this.owner = owner;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public Owner getOwner() {
        return owner;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }
}
