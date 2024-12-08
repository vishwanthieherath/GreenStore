package com.vishwanthie.orderservice.services.impl;

import com.vishwanthie.orderservice.domain.entities.CartEntity;
import com.vishwanthie.orderservice.repositories.CartRepository;
import com.vishwanthie.orderservice.services.CartService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    public CartServiceImpl(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public CartEntity create(CartEntity cartEntity) {
        return cartRepository.save(cartEntity);
    }

    @Override
    public List<CartEntity> getAll() {
        return StreamSupport.stream(cartRepository.
                        findAll()
                        .spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public Page<CartEntity> getAll(int page, int size) {
        return cartRepository.findAll(PageRequest.of(page, size, Sort.by("name")));
    }

    @Override
    public CartEntity getOne(Long id) {
        return cartRepository.findById(id).orElseThrow(() -> new RuntimeException("Cart not found"));
    }

    @Override
    public boolean isExist(Long id) {
        return cartRepository.existsById(id);
    }

    @Override
    public CartEntity partialUpdate(Long id, CartEntity cartEntity) {
        cartEntity.setId(id);

        return cartRepository.findById(id).map(existingCart -> {
            Optional.ofNullable(cartEntity.getName()).ifPresent(existingCart::setName);
            return cartRepository.save(existingCart);
        }).orElseThrow(() -> new RuntimeException("Cart not found"));
    }

    @Override
    public void deleteOne(Long id) {
        cartRepository.deleteById(id);
    }

    @Override
    public List<CartEntity> getCartsByUserId(String userId) {
        return cartRepository.findByUserId(userId);
    }

}
