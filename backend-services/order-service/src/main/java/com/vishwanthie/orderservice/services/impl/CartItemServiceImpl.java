package com.vishwanthie.orderservice.services.impl;

import com.vishwanthie.orderservice.domain.entities.CartItemEntity;
import com.vishwanthie.orderservice.repositories.CartItemRepository;
import com.vishwanthie.orderservice.services.CartItemService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Transactional
@Service
public class CartItemServiceImpl implements CartItemService {

    private final CartItemRepository cartItemRepository;

    public CartItemServiceImpl(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    @Override
    public CartItemEntity create(CartItemEntity cartItemEntity) {
        return cartItemRepository.save(cartItemEntity);
    }

    @Override
    public List<CartItemEntity> getAll() {
        return StreamSupport.stream(cartItemRepository.
                        findAll()
                        .spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public Page<CartItemEntity> getAll(int page, int size) {
        return cartItemRepository.findAll(PageRequest.of(page, size, Sort.by("name")));
    }

    @Override
    public CartItemEntity getOne(Long id) {
        return cartItemRepository.findById(id).orElseThrow(() -> new RuntimeException("CartItem not found"));
    }

    @Override
    public boolean isExist(Long id) {
        return cartItemRepository.existsById(id);
    }

    @Override
    public CartItemEntity partialUpdate(Long id, CartItemEntity cartItemEntity) {
        cartItemEntity.setId(id);

        return cartItemRepository.findById(id).map(existingCartItem -> {
            Optional.ofNullable(cartItemEntity.getId()).ifPresent(existingCartItem::setId);
            return cartItemRepository.save(existingCartItem);
        }).orElseThrow(() -> new RuntimeException("CartItem not found"));
    }

    @Override
    public void deleteOne(Long cartId, Long id) {
//        System.out.println(cartId + "  " + id);
        cartItemRepository.deleteByCartIdAndId(cartId, id);
    }

    @Override
    public List<CartItemEntity> getCartItemsByCartId(Long cartId) {
        return cartItemRepository.findByCartId(cartId);
    }

}
