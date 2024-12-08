import { Link } from "react-router-dom";

const CartCard = (props) => {
  return (
    <Link className="w-5/6 flex justify-center items-center" to={`/carts/${props.id}`}>
      <div className="flex flex-col w-5/6 h-auto justify-start items-center p-4 shadow-lg rounded-md m-4 cursor-pointer px-8">
        <div className="flex w-full justify-start items-center text-xl">
          <h1>{props.name}</h1>
        </div>

        <div className="flex w-full justify-between items-center">
            <div>
                <p>{props.name}</p>
            </div>
            <div>

            </div>
            <div>

            </div>
        </div>
      </div>
    </Link>
  );
};

export default CartCard;
