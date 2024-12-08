package com.vishwanthie.productservice.services.impl;

import com.vishwanthie.productservice.domain.entities.CategoryEntity;
import com.vishwanthie.productservice.repositories.CategoryRepository;
import com.vishwanthie.productservice.services.CategoryService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static com.vishwanthie.productservice.constants.Constant.CATEGORY_IMAGES;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public CategoryEntity create(CategoryEntity categoryEntity) {
        return categoryRepository.save(categoryEntity);
    }

    @Override
    public List<CategoryEntity> getAll() {
        return StreamSupport.stream(categoryRepository.
                        findAll()
                        .spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public Page<CategoryEntity> getAll(int page, int size) {
        return categoryRepository.findAll(PageRequest.of(page, size, Sort.by("name")));
    }

    @Override
    public CategoryEntity getOne(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @Override
    public boolean isExist(Long id) {
        return categoryRepository.existsById(id);
    }

    @Override
    public CategoryEntity partialUpdate(Long id, CategoryEntity categoryEntity) {
        categoryEntity.setId(id);

        return categoryRepository.findById(id).map(existingCategory -> {
            Optional.ofNullable(categoryEntity.getName()).ifPresent(existingCategory::setName);
            return categoryRepository.save(existingCategory);
        }).orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @Override
    public void deleteOne(Long id) {
        categoryRepository.deleteById(id);
    }

    public String uploadImage(Long id, MultipartFile file) {
        CategoryEntity category = getOne(id);
        String imageUrl = imageFunction.apply(String.valueOf(id), file);
        category.setImageUrl(imageUrl);
        categoryRepository.save(category);

        return imageUrl;
    }

    private final Function<String, String> fileExtension = filename -> Optional.of(filename)
            .filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1))
            .orElse(".png");


    private final BiFunction<String, MultipartFile, String> imageFunction = (id, image) -> {
        String filename = id + fileExtension.apply(image
                .getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(CATEGORY_IMAGES)
                    .toAbsolutePath()
                    .normalize();
            if(!Files.exists(fileStorageLocation)) {
                Files.createDirectory(fileStorageLocation);
            }
            Files.copy(image.getInputStream(), fileStorageLocation
                    .resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/categories/image/" + filename)
                    .toUriString();
        } catch (Exception exception) {
            throw new RuntimeException("Unable to upload photo");
        }
    };

}
