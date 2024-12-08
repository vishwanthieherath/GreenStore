package com.vishwanthie.orderservice.services;

import com.vishwanthie.orderservice.domain.entities.CartEntity;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CartService {

    CartEntity create(CartEntity cart);

    List<CartEntity> getAll();

    Page<CartEntity> getAll(int page, int size);

    CartEntity getOne(Long id);

    boolean isExist(Long id);

    CartEntity partialUpdate(Long id, CartEntity CartEntity);

    void deleteOne(Long id);

    List<CartEntity> getCartsByUserId(String userId);
}
