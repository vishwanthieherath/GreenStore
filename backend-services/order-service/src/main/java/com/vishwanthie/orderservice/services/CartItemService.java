package com.vishwanthie.orderservice.services;

import com.vishwanthie.orderservice.domain.entities.CartItemEntity;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CartItemService {

    CartItemEntity create(CartItemEntity cartItem);

    List<CartItemEntity> getAll();

    Page<CartItemEntity> getAll(int page, int size);

    CartItemEntity getOne(Long id);

    boolean isExist(Long id);

    CartItemEntity partialUpdate(Long id, CartItemEntity CartItemEntity);

    void deleteOne(Long id, Long itemId);

    List<CartItemEntity> getCartItemsByCartId(Long cartId);
}
