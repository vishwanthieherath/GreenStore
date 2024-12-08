package com.vishwanthie.orderservice.mappers.impl;

import com.vishwanthie.orderservice.domain.dto.CartItemDto;
import com.vishwanthie.orderservice.domain.entities.CartItemEntity;
import com.vishwanthie.orderservice.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class CartItemMapper implements Mapper<CartItemEntity, CartItemDto> {

    private final ModelMapper modelMapper;

    public CartItemMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public CartItemDto mapTo(CartItemEntity cartItemEntity) {
        return modelMapper.map(cartItemEntity, CartItemDto.class);
    }

    @Override
    public CartItemEntity mapFrom(CartItemDto cartItemDto) {
        return modelMapper.map(cartItemDto, CartItemEntity.class);
    }
}
