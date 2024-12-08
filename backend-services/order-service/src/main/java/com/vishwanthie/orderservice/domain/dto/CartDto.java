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
public class CartDto {

    private Long id;

    private String name;

    private String userId;

    private Integer totalProducts;

    private Integer totalItems;

    private BigDecimal totalPrice;

}
