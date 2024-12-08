package com.vishwanthie.orderservice.repositories;

import com.vishwanthie.orderservice.domain.dto.CartDto;
import com.vishwanthie.orderservice.domain.entities.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Long> {
    List<CartEntity> findByUserId(String userId);
}
