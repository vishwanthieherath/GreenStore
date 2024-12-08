package com.vishwanthie.productservice.controllers;

import com.vishwanthie.productservice.domain.dto.ProductDto;
import com.vishwanthie.productservice.domain.entities.ProductEntity;
import com.vishwanthie.productservice.mappers.Mapper;
import com.vishwanthie.productservice.services.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import static com.vishwanthie.productservice.constants.Constant.PRODUCT_IMAGES;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    private final Mapper<ProductEntity, ProductDto> productMapper;

    public ProductController(ProductService productService, Mapper<ProductEntity, ProductDto> productMapper) {
        this.productService = productService;
        this.productMapper = productMapper;
    }

    @PostMapping
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto product) {
        ProductEntity productEntity = productMapper.mapFrom(product);
        ProductEntity savedProductEntity = productService.create(productEntity);
        return ResponseEntity.created(URI.create("/products/productID"))
                .body(productMapper.mapTo(savedProductEntity));
    }

    @GetMapping
    public ResponseEntity<Page<ProductDto>> listProducts(@RequestParam(value = "page", defaultValue = "0") int page, @RequestParam(value = "size", defaultValue = "10") int size) {
        Page<ProductEntity> products = productService.getAll(page, size);
        return ResponseEntity.ok().body(products.map(productMapper::mapTo));
    }

    @GetMapping(path = "/category/{categoryId}")
    public ResponseEntity<List<ProductEntity>> getProductsByCategoryId(@PathVariable("categoryId") Long categoryId) {
        List<ProductEntity> categoryProducts = productService.getProductsByCategoryId(categoryId);
        return ResponseEntity.ok().body(categoryProducts);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable("id") Long id) {
        ProductEntity foundProduct = productService.getOne(id);
        if (foundProduct != null) {
            ProductDto productDto = productMapper.mapTo(foundProduct);
            return new ResponseEntity<>(productDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<ProductDto> fullUpdateProduct(
            @PathVariable("id") Long id,
            @RequestBody ProductDto productDto) {

        if(!productService.isExist(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        productDto.setId(id);
        ProductEntity productEntity = productMapper.mapFrom(productDto);
        ProductEntity savedProductEntity = productService.create(productEntity);
        return new ResponseEntity<>(
                productMapper.mapTo(savedProductEntity),
                HttpStatus.OK);
    }

    @GetMapping(path = "/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
    public byte[] getImage(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(PRODUCT_IMAGES + filename));
    }

    @PutMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestParam("id") Long id, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok().body(productService.uploadImage(id, file));
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<ProductDto> partialUpdate(
            @PathVariable("id") Long id,
            @RequestBody ProductDto productDto
    ) {
        if(!productService.isExist(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        ProductEntity productEntity = productMapper.mapFrom(productDto);
        ProductEntity updatedProduct = productService.partialUpdate(id, productEntity);
        return new ResponseEntity<>(
                productMapper.mapTo(updatedProduct),
                HttpStatus.OK
        );
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<ProductDto> deleteProduct(@PathVariable("id") Long id) {
        productService.deleteOne(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
