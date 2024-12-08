package com.vishwanthie.productservice.controllers;

import com.vishwanthie.productservice.domain.dto.CategoryDto;
import com.vishwanthie.productservice.domain.entities.CategoryEntity;
import com.vishwanthie.productservice.mappers.Mapper;
import com.vishwanthie.productservice.services.CategoryService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;

import static com.vishwanthie.productservice.constants.Constant.CATEGORY_IMAGES;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    private final Mapper<CategoryEntity, CategoryDto> categoryMapper;

    public CategoryController(CategoryService categoryService, Mapper<CategoryEntity, CategoryDto> categoryMapper) {
        this.categoryService = categoryService;
        this.categoryMapper = categoryMapper;
    }

    @PostMapping
    public ResponseEntity<CategoryDto> createCategory(@RequestBody CategoryDto category) {
        CategoryEntity categoryEntity = categoryMapper.mapFrom(category);
        CategoryEntity savedCategoryEntity = categoryService.create(categoryEntity);
        return ResponseEntity.created(URI.create("/categories/categoryID"))
                .body(categoryMapper.mapTo(savedCategoryEntity));
    }

    @GetMapping
    public ResponseEntity<Page<CategoryDto>> listCategories(@RequestParam(value = "page", defaultValue = "0") int page, @RequestParam(value = "size", defaultValue = "15") int size) {
        Page<CategoryEntity> categories = categoryService.getAll(page, size);
        return ResponseEntity.ok().body(categories.map(categoryMapper::mapTo));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<CategoryDto> getCategory(@PathVariable("id") Long id) {
        CategoryEntity foundCategory = categoryService.getOne(id);
        if (foundCategory != null) {
            CategoryDto categoryDto = categoryMapper.mapTo(foundCategory);
            return new ResponseEntity<>(categoryDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<CategoryDto> fullUpdateCategory(
            @PathVariable("id") Long id,
            @RequestBody CategoryDto categoryDto) {

        if(!categoryService.isExist(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        categoryDto.setId(id);
        CategoryEntity categoryEntity = categoryMapper.mapFrom(categoryDto);
        CategoryEntity savedCategoryEntity = categoryService.create(categoryEntity);
        return new ResponseEntity<>(
                categoryMapper.mapTo(savedCategoryEntity),
                HttpStatus.OK);
    }

    @GetMapping(path = "/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
    public byte[] getImage(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(CATEGORY_IMAGES + filename));
    }

    @PutMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestParam("id") Long id, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok().body(categoryService.uploadImage(id, file));
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<CategoryDto> partialUpdate(
            @PathVariable("id") Long id,
            @RequestBody CategoryDto categoryDto
    ) {
        if(!categoryService.isExist(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        CategoryEntity categoryEntity = categoryMapper.mapFrom(categoryDto);
        CategoryEntity updatedCategory = categoryService.partialUpdate(id, categoryEntity);
        return new ResponseEntity<>(
                categoryMapper.mapTo(updatedCategory),
                HttpStatus.OK
        );
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<CategoryDto> deleteCategory(@PathVariable("id") Long id) {
        categoryService.deleteOne(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
