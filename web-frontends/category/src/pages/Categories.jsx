import React, { useContext } from "react";
import { CategoryContext } from "../contexts/CategoryContext";
import CategoryCard from "../components/CategoryCard";

export default function Categories() {

  const categories = useContext(CategoryContext);

  return (
    <div className="flex justify-center items-center p-4">
      <div className="grid grid-cols-5 gap-4 p-4">
        {categories.content &&
          categories.content.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
      </div>
    </div>
  );
}
