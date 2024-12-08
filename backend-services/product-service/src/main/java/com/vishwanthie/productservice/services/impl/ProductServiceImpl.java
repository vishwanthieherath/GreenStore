package com.vishwanthie.productservice.services.impl;

import com.vishwanthie.productservice.domain.entities.ProductEntity;
import com.vishwanthie.productservice.repositories.ProductRepository;
import com.vishwanthie.productservice.services.ProductService;
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

import static com.vishwanthie.productservice.constants.Constant.PRODUCT_IMAGES;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public ProductEntity create(ProductEntity productEntity) {
        return productRepository.save(productEntity);
    }

    @Override
    public List<ProductEntity> getAll() {
        return StreamSupport.stream(productRepository.
                findAll()
                .spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public Page<ProductEntity> getAll(int page, int size) {
        return productRepository.findAll(PageRequest.of(page, size, Sort.by("name")));
    }

    @Override
    public List<ProductEntity> getProductsByCategoryId(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    @Override
    public ProductEntity getOne(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Override
    public boolean isExist(Long id) {
        return productRepository.existsById(id);
    }

    @Override
    public ProductEntity partialUpdate(Long id, ProductEntity productEntity) {
        productEntity.setId(id);

        return productRepository.findById(id).map(existingProduct -> {
            Optional.ofNullable(productEntity.getName()).ifPresent(existingProduct::setName);
            return productRepository.save(existingProduct);
        }).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Override
    public void deleteOne(Long id) {
        productRepository.deleteById(id);
    }

    public String uploadImage(Long id, MultipartFile file) {
        ProductEntity product = getOne(id);
        String imageUrl = imageFunction.apply(String.valueOf(id), file);
        product.setImageUrl(imageUrl);
        productRepository.save(product);

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
            Path fileStorageLocation = Paths.get(PRODUCT_IMAGES)
                    .toAbsolutePath()
                    .normalize();
            if(!Files.exists(fileStorageLocation)) {
                Files.createDirectory(fileStorageLocation);
            }
            Files.copy(image.getInputStream(), fileStorageLocation
                    .resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/products/image/" + filename)
                    .toUriString();
        } catch (Exception exception) {
            throw new RuntimeException("Unable to upload photo");
        }
    };

}
