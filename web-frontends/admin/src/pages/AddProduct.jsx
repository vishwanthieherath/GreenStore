import { useState, useRef } from "react";

import SideNavigation from "../components/SideNavigation";
import { saveProduct } from "../services/ProductService";
import { updateImage } from "../services/ProductService";

const AddProduct = () => {

  const fileRef = useRef();

    const [values, setValues] = useState({
      name: "",
      price: "",
      category: "",
    });
    const [file, setFile] = useState(undefined);

    const onChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleNewProduct = async (event) => {
        event.preventDefault();

        try {
          const { data } = await saveProduct(values)
          const formData = new FormData();
          formData.append("file", file, file.name);
          formData.append("id", data.id);
          const { data: imageUrl } = await updateImage(formData);
          setFile(undefined);
          fileRef.current.value = null;
          setValues({ name: "" });
          // getAllProducts();
        } catch (error) {
          console.log(error);
        }
    }

    return (
      <div className="flex justify-center items-start w-full p-6">
        <SideNavigation />

        <div className="flex justify-center items-start w-5/6 p-4 min-h-80 h-80">
          <form onSubmit={handleNewProduct} className="w-4/6 p-6">
            <div className="flex justify-between items-center mb-5">
              <label htmlFor="">Product Name: </label>
              <input
                className="block w-60 h-8 border-2 rounded-lg px-3 py-2"
                type="text"
                name="name"
                value={values.name}
                onChange={onChange}
                required
              />
            </div>
            <div className="flex justify-between items-center mb-5">
              <label htmlFor="">Product Price: </label>
              <input
                className="block w-60 h-8 border-2 rounded-lg px-3 py-2"
                type="text"
                name="price"
                value={values.price}
                onChange={onChange}
                required
              />
            </div>
            <div className="flex justify-between items-center mb-5">
              <label htmlFor="">Product Category: </label>
              <input
                className="block w-60 h-8 border-2 rounded-lg px-3 py-2"
                type="text"
                name="category"
                value={values.category}
                onChange={onChange}
                required
              />
            </div>
            <div className="flex justify-between items-center mb-8">
              <label htmlFor="">Upload Image: </label>
              <input
                className="block w-60 h-8 file:rounded-lg file:mr-4"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                ref={fileRef}
              />
            </div>
            <div className="flex justify-end items-center mb-8">
              <button className="bg-dark-white rounded-lg w-40 px-8 h-8 text-sm mt-5">
                Cancel
              </button>
              <button
                type="submit"
                className="bg-lightest-green rounded-lg w-40 px-8 h-8 text-sm mt-5 ml-4"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default AddProduct;
