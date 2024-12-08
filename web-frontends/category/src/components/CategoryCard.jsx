import { Link } from "react-router-dom";

const CategoryCard = (props) => {

    return (
      <Link to={`/products/category/${props.id}`}>
        <div className="flex flex-col w-40 h-48 justify-center items-center p-4 shadow-lg rounded-md m-4 cursor-pointer">
          <div className="flex justify-center items-center p-2 w-36 h-36 overflow-hidden">
            <img src={props.imageUrl} />
          </div>
          <div className="flex justify-center items-center text-md">
            <h1>{props.name}</h1>
          </div>
        </div>
      </Link>
    );
}

export default CategoryCard;
