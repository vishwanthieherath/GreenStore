package com.vishwanthie.orderservice.controllers;

import com.vishwanthie.orderservice.domain.dto.CartDto;
import com.vishwanthie.orderservice.domain.entities.CartEntity;
import com.vishwanthie.orderservice.mappers.Mapper;
import com.vishwanthie.orderservice.services.CartService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/carts")
public class CartController {

    private final CartService cartService;

    private final Mapper<CartEntity, CartDto> cartMapper;

    public CartController(CartService cartService, Mapper<CartEntity, CartDto> cartMapper) {
        this.cartService = cartService;
        this.cartMapper = cartMapper;
    }

    @PostMapping
    public ResponseEntity<CartDto> createCart(@RequestBody CartDto cart) {
        CartEntity cartEntity = cartMapper.mapFrom(cart);
        CartEntity savedCartEntity = cartService.create(cartEntity);
        return ResponseEntity.created(URI.create("/carts/cartID"))
                .body(cartMapper.mapTo(savedCartEntity));
    }

    @GetMapping
    public ResponseEntity<Page<CartDto>> listCarts(@RequestParam(value = "page", defaultValue = "0") int page, @RequestParam(value = "size", defaultValue = "15") int size) {
        Page<CartEntity> carts = cartService.getAll(page, size);
        return ResponseEntity.ok().body(carts.map(cartMapper::mapTo));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<CartDto> getCart(@PathVariable("id") Long id) {
        CartEntity foundCart = cartService.getOne(id);
        if (foundCart != null) {
            CartDto cartDto = cartMapper.mapTo(foundCart);
            return new ResponseEntity<>(cartDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(path = "/user/{userId}")
    public ResponseEntity<List<CartEntity>> getCartsByUserId(@PathVariable("userId") String userId) {
        List<CartEntity> userCarts = cartService.getCartsByUserId(userId);
        return ResponseEntity.ok().body(userCarts);
    }


    @PutMapping(path = "/{id}")
    public ResponseEntity<CartDto> fullUpdateCart(
            @PathVariable("id") Long id,
            @RequestBody CartDto cartDto) {

        if(!cartService.isExist(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        cartDto.setId(id);
        CartEntity cartEntity = cartMapper.mapFrom(cartDto);
        CartEntity savedCartEntity = cartService.create(cartEntity);
        return new ResponseEntity<>(
                cartMapper.mapTo(savedCartEntity),
                HttpStatus.OK);
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<CartDto> partialUpdate(
            @PathVariable("id") Long id,
            @RequestBody CartDto cartDto
    ) {
        if(!cartService.isExist(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        CartEntity cartEntity = cartMapper.mapFrom(cartDto);
        CartEntity updatedCart = cartService.partialUpdate(id, cartEntity);
        return new ResponseEntity<>(
                cartMapper.mapTo(updatedCart),
                HttpStatus.OK
        );
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<CartDto> deleteCart(@PathVariable("id") Long id) {
        cartService.deleteOne(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
