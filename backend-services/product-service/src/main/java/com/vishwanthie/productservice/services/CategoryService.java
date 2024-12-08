package com.vishwanthie.productservice.services;

import com.vishwanthie.productservice.domain.entities.CategoryEntity;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {

    CategoryEntity create(CategoryEntity category);

    List<CategoryEntity> getAll();

    Page<CategoryEntity> getAll(int page, int size);

    CategoryEntity getOne(Long id);

    boolean isExist(Long id);

    CategoryEntity partialUpdate(Long id, CategoryEntity CategoryEntity);

    void deleteOne(Long id);

    String uploadImage(Long id, MultipartFile file);
}
