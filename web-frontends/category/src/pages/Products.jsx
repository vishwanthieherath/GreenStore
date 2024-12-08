import ProductCard from "../components/ProductCard";
import SideNavigation from "../components/SideNavigation";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProducts, getProductsByCategory } from "../services/ProductService";

  const Products = () => {

    const { categoryId } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(null);

  // console.log("categoryId", categoryId);

  // const [currentPage, setCurrentPage] = useState(0);

  // const getAllProducts = async (page, size = 10) => {
  //   try {
  //     setCurrentPage(page);
  //     const { data } = await getProducts(page, size);
  //     setProducts(data);
  //   } catch (error) {
  //     console.error("Error getting products:", error);
  //   }
  // };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await getProductsByCategory(categoryId);
        setProducts(data);
        // console.log(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  
  const clickedText = (text) => {
    setClicked(text);
  };


  return (
    <>
      <div className="flex justify-start ml-16 items-center px-5 pt-8 text-lg text-dark-green h-14">
        {clicked ? (
          <h1>{clicked}</h1>
        ) : (
          <h1>All Products</h1>
        )}
      </div>

      <div className="flex justify-between items-start p-4">
        <div className="pt-6 mr-5">
          <SideNavigation getClickedText={clickedText}/>
        </div>

        <div className="flex flex-col justify-center items-center w-5/6 p-4">
          {products.length > 0 ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4 mb-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center p-16 text-xl text-light-green">
              {products?.length === 0 && <h1>No products found</h1>}
            </div>
          )}

          {/* <div className="flex justify-center items-center w-full">
          {products?.length > 0 && products.totalPages > 1 && (
            <div>
              <button
                className={`w-8 h-8 bg-lightest-green rounded-full mx-1 ${
                  0 === currentPage ? "disabled" : ""
                }`}
                onClick={() => getAllProducts(currentPage - 1)}
                disabled={currentPage === 0}
              >
                &laquo;
              </button>
              {products &&
                [...Array(products.totalPages).keys()].map((page, index) => (
                  <button
                    key={page}
                    className={`w-8 h-8 bg-lightest-green rounded-full mx-1 ${
                      currentPage === page ? "active" : ""
                    }`}
                    onClick={() => getAllProducts(page)}
                  >
                    {page + 1}
                  </button>
                ))}
              <button
                className={`w-8 h-8 bg-lightest-green rounded-full mx-1 ${
                  products.totalPages === currentPage + 1 ? "disabled" : ""
                }`}
                onClick={() => getAllProducts(currentPage + 1)}
                disabled={currentPage + 1 === products.totalPages}
              >
                &raquo;
              </button>
            </div>
          )}
        </div> */}
        </div>
      </div>
    </>
  );
};

export default Products;
