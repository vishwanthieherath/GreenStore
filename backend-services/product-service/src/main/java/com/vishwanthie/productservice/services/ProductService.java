package com.vishwanthie.productservice.services;

import com.vishwanthie.productservice.domain.entities.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    ProductEntity create(ProductEntity product);

    List<ProductEntity> getAll();

    Page<ProductEntity> getAll(int page, int size);

    ProductEntity getOne(Long id);

    boolean isExist(Long id);

    ProductEntity partialUpdate(Long id, ProductEntity productEntity);

    void deleteOne(Long id);

    String uploadImage(Long id, MultipartFile file);

    List<ProductEntity> getProductsByCategoryId(Long categoryId);
}
