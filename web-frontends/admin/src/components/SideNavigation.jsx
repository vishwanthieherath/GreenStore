import { Link } from "react-router-dom";

const SideNavigation = () => {
  return (
    <div className="flex w-1/6 justify-start items-center p-4">
      <ul className="py-6">
        <li className="mb-4">
          <Link to="/admin">Dashboard</Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/products">Products</Link>
        </li>
        <li>
          <Link to="/admin/categories">Categories</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNavigation;
