import logo from '../assets/logo.png';
import { BrowserRouter as Router, Link } from "react-router-dom";

const Footer = () => {
    return (
      <Router>
        <footer className="flex flex-col justify-center items-center bg-light-black text-dark-white text-sm p-8 w-full">
          <div className="flex justify-between items-center w-11/12 mb-10">
            <div className="flex flex-col w-2/6">
              <div className="w-32 h-auto mb-6">
                <img src={logo} alt="logo" />
              </div>

              <div className="text-sm">
                <p>No.48, Park Road, Mount Lavinia</p>
              </div>
            </div>

            <div className="flex justify-around items-center w-3/6">
              <div className="flex flex-col">
                <h3 className="font-semibold">Useful Links</h3>
                <p>
                  <Link to="/products/category/1">Products</Link>
                </p>
                <p><Link to="/categories">Categories</Link></p>
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold">Categories</h3>
                <p><Link to="/products/category/1">Vegetables</Link></p>
                <p><Link to="/products/category/2">Fruits</Link></p>
              </div>
            </div>
          </div>

          <div className="bg-dark-grey w-full h-px mb-10"></div>

          <div className="flex justify-between items-center w-11/12">
            <div className="h-8 text-sm flex justify-center items-center">
              Copyright © 2024 GreenStore | All Right Reserved
            </div>
            <div></div>
          </div>
        </footer>
      </Router>
    );
}

export default Footer;
