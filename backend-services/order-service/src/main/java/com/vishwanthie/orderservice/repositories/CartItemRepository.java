package com.vishwanthie.orderservice.repositories;

import com.vishwanthie.orderservice.domain.entities.CartItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItemEntity, Long> {
    List<CartItemEntity> findByCartId(Long cartId);

    @Transactional
    @Modifying
    @Query("DELETE FROM CartItemEntity c WHERE c.cartId = :cartId AND c.id = :id")
    void deleteByCartIdAndId(@Param("cartId") Long cartId, @Param("id") Long id);
}
