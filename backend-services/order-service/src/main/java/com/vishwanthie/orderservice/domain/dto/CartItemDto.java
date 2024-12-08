package com.vishwanthie.orderservice.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemDto {

    private Long id;

    private Long cartId;

    private Long productId;

    private String productName;

    private Integer quantity;

    private BigDecimal totalItemPrice;

}
