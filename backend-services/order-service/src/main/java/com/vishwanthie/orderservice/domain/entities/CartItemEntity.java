package com.vishwanthie.orderservice.domain.entities;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@JsonInclude(NON_DEFAULT)
@Table(name = "cart-items", schema = "greenstore")
public class CartItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cart_items_id_seq")
    private Long id;

    @Column(name = "cart_id")
    private Long cartId;

    private Long productId;

    private String productName;

    private Integer quantity;

    private BigDecimal totalItemPrice;

}
