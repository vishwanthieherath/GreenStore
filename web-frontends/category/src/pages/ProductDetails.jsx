import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SideNavigation from "../components/SideNavigation";
import Product from "../components/Product";

export default function ProductDetails() {

  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/products/${productId}`
        );
        setProduct(response.data);
        console.log(product);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div className="flex justify-start items-start p-4">
      <div className="pt-6 w-1/6">
        <SideNavigation />
      </div>
      <div className="flex justify-center items-center w-5/6 p-6">
        {product && <Product key={product.id} {...product} />}
      </div>
    </div>
  );
}
