import { Link } from "react-router-dom";
import SideNavigation from "../components/SideNavigation";

const Products = () => {
    return (
      <div className="flex justify-center items-center w-full p-6">
        <SideNavigation />

        <div className="flex w-5/6">
          <Link to="/admin/products/add-product" className="flex justify-center items-center bg-lightest-green rounded-lg w-fit px-8 h-8 text-sm">
            Add Product
          </Link>
        </div>
      </div>
    );
}

export default Products;
