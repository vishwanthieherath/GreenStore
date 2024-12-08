import React from 'react'
import { CategoryContext } from '@GreenStore/category'
import { useContext } from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import axios from 'axios'

const Categories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get("http://localhost:4000/categories");
          setCategories(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };

      fetchCategories();
    }, []);

    // console.log(categories);

  return (
    // <Router>
    <section
      id="categories"
      className="flex justify-center items-center p-10 bg-white overflow-hidden"
    >
      <div className="w-full p-8">
        <div className="w-full flex justify-start items-center text-xl mb-10">
          <h1>Categories</h1>
        </div>

        <div className="flex justify-center items-center mb-10 overflow-x-hidden">
          {categories.content &&
            categories.content.map((category) => (
              <Link to={`/products/category/${category.id}`} key={category.id}>
                <div className="flex flex-col w-40 h-48 justify-center items-center p-4 shadow-lg rounded-md m-4">
                  <div className="flex justify-center items-center p-2 w-36 h-36 overflow-hidden cursor-pointer">
                    <img src={category.imageUrl} />
                  </div>
                  <div className="flex justify-center items-center text-md">
                    <h1>{category.name}</h1>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        <div className="w-full flex justify-end items-center text-sm text-blue-400">
          <Link to="/categories">View More</Link>
        </div>
      </div>
    </section>
    // </Router>
  );
}

export default Categories
