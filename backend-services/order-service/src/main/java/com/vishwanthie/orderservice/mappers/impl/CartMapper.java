package com.vishwanthie.orderservice.mappers.impl;

import com.vishwanthie.orderservice.domain.dto.CartDto;
import com.vishwanthie.orderservice.domain.entities.CartEntity;
import com.vishwanthie.orderservice.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class CartMapper implements Mapper<CartEntity, CartDto> {

    private final ModelMapper modelMapper;

    public CartMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public CartDto mapTo(CartEntity cartEntity) {
        return modelMapper.map(cartEntity, CartDto.class);
    }

    @Override
    public CartEntity mapFrom(CartDto cartDto) {
        return modelMapper.map(cartDto, CartEntity.class);
    }
}
