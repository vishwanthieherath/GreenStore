package com.vishwanthie.orderservice.controllers;

import com.vishwanthie.orderservice.domain.dto.CartItemDto;
import com.vishwanthie.orderservice.domain.entities.CartItemEntity;
import com.vishwanthie.orderservice.mappers.Mapper;
import com.vishwanthie.orderservice.services.CartItemService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/cart-items")
public class CartItemController {

    private final CartItemService cartItemService;

    private final Mapper<CartItemEntity, CartItemDto> cartItemMapper;

    public CartItemController(CartItemService cartItemService, Mapper<CartItemEntity, CartItemDto> cartItemMapper) {
        this.cartItemService = cartItemService;
        this.cartItemMapper = cartItemMapper;
    }

    @PostMapping
    public ResponseEntity<CartItemDto> createCartItem(@RequestBody CartItemDto cartItem) {
        CartItemEntity cartItemEntity = cartItemMapper.mapFrom(cartItem);
        CartItemEntity savedCartItemEntity = cartItemService.create(cartItemEntity);
        return ResponseEntity.created(URI.create("/cartItems/cartItemID"))
                .body(cartItemMapper.mapTo(savedCartItemEntity));
    }

//    @GetMapping
//    public ResponseEntity<Page<CartItemDto>> listCartItems(@RequestParam(value = "page", defaultValue = "0") int page, @RequestParam(value = "size", defaultValue = "15") int size) {
//        Page<CartItemEntity> cartItems = cartItemService.getAll(page, size);
//        return ResponseEntity.ok().body(cartItems.map(cartItemMapper::mapTo));
//    }

//    @GetMapping(path = "/{id}")
//    public ResponseEntity<CartItemDto> getCartItem(@PathVariable("id") Long id) {
//        CartItemEntity foundCartItem = cartItemService.getOne(id);
//        if (foundCartItem != null) {
//            CartItemDto cartItemDto = cartItemMapper.mapTo(foundCartItem);
//            return new ResponseEntity<>(cartItemDto, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }

    @GetMapping(path = "/{cartId}")
    public ResponseEntity<List<CartItemEntity>> getCartItemsByCartId(@PathVariable("cartId") Long cartId) {
        List<CartItemEntity> cartItems = cartItemService.getCartItemsByCartId(cartId);

        return ResponseEntity.ok().body(cartItems);
    }

//    @PutMapping(path = "/{id}")
//    public ResponseEntity<CartItemDto> fullUpdateCartItem(
//            @PathVariable("id") Long id,
//            @RequestBody CartItemDto cartItemDto) {
//
//        if(!cartItemService.isExist(id)) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//
//        cartItemDto.setId(id);
//        CartItemEntity cartItemEntity = cartItemMapper.mapFrom(cartItemDto);
//        CartItemEntity savedCartItemEntity = cartItemService.create(cartItemEntity);
//        return new ResponseEntity<>(
//                cartItemMapper.mapTo(savedCartItemEntity),
//                HttpStatus.OK);
//    }

//    @PatchMapping(path = "/{id}")
//    public ResponseEntity<CartItemDto> partialUpdate(
//            @PathVariable("id") Long id,
//            @RequestBody CartItemDto cartItemDto
//    ) {
//        if(!cartItemService.isExist(id)) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//
//        CartItemEntity cartItemEntity = cartItemMapper.mapFrom(cartItemDto);
//        CartItemEntity updatedCartItem = cartItemService.partialUpdate(id, cartItemEntity);
//        return new ResponseEntity<>(
//                cartItemMapper.mapTo(updatedCartItem),
//                HttpStatus.OK
//        );
//    }

    @DeleteMapping(path = "/{cartId}/{id}")
    public ResponseEntity<CartItemDto> deleteCartItem(@PathVariable Long cartId, @PathVariable Long id) {
//        System.out.println(cartId + "  " + id);
        cartItemService.deleteOne(cartId, id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
